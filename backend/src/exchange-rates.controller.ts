import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import * as xml2js from 'xml2js';
import axios from 'axios';
import { ApiKeyGuard } from './api-key.guard';

interface CurrencyRate {
  name: string;
  rate: number;
}

interface CurrencyRateObj {
  [currency: string]: number;
}

@Controller('EU')
@UseGuards(ApiKeyGuard)
export class ExchangeRatesController {
  private parseXml(xml: Promise<string>): Promise<any> {
    const parser = new xml2js.Parser({ explicitArray: false });
    return new Promise((resolve, reject) => {
      parser.parseString(xml, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  @Get()
  async getExchangeRates(
    @Query('currency') currency: string,
    @Query('rate') rate: number,
    @Query('operation') operation: string = '$gt',
  ): Promise<any> {
    const response = await axios
      .get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml')
      .then((res) => res);

    const parsedXml = await this.parseXml(response.data);
    const cubeArr = parsedXml['gesmes:Envelope'].Cube.Cube.Cube;

    const rates: CurrencyRate[] = cubeArr.map((cube) => {
      return {
        name: cube['$'].currency,
        rate: parseFloat(cube['$'].rate),
      };
    });

    const rateObj: CurrencyRateObj = cubeArr.reduce((acc, cube) => {
      const currency = cube['$'].currency;
      acc[currency] = parseFloat(cube['$'].rate);
      return acc;
    }, {});

    let filteredRates: CurrencyRate[] = rates;
    if (currency) {
      filteredRates = filteredRates.filter((rate) =>
        rate.name.toLowerCase().includes(currency.toLowerCase()),
      );
    }

    if (rate) {
      if (operation === '$gt') {
        filteredRates = filteredRates.filter(
          (rateItem) => rateItem.rate > rate,
        );
      } else if (operation === '$lt') {
        filteredRates = filteredRates.filter(
          (rateItem) => rateItem.rate < rate,
        );
      } else if (operation === '$eq') {
        filteredRates = filteredRates.filter(
          (rateItem) => rateItem.rate === rate,
        );
      }
    }

    return {
      date: parsedXml['gesmes:Envelope'].Cube.Cube.$.time,
      rate: rateObj,
      rates: filteredRates,
    };
  }
}
