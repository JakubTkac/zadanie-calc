import { Controller, Get } from '@nestjs/common';
import * as xml2js from 'xml2js';
import axios from 'axios';

@Controller('EU')
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
  async getExchangeRates(): Promise<any> {
    const response = await axios
      .get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml')
      .then((res) => res);

    const parsedXml = await this.parseXml(response.data);
    const cubeArr = parsedXml['gesmes:Envelope'].Cube.Cube.Cube;
    const rates = cubeArr.map((cube) => {
      return {
        name: cube['$'].currency,
        rate: cube['$'].rate,
      };
    });
    const rateArr = cubeArr.map((cube) => {
      return {
        [cube['$'].currency]: cube['$'].rate,
      };
    });

    return {
      date: parsedXml['gesmes:Envelope'].Cube.Cube.$.time,
      rate: rateArr,
      rates: rates,
    };
  }
}
