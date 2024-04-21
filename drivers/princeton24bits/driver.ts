import { MySignal } from './signal';

const { RFDriver } = require('homey-rfdriver');

class MyDriver extends RFDriver {

  static SIGNAL = MySignal;

  async onRFInit() {
    await super.onRFInit();

    this.homey.flow
      .getDeviceTriggerCard('ringbell:received')
      .registerRunListener(async (args: any, state: any) => {
        console.log('Trigger:', args, state);
        return true;
      });
  }

}

module.exports = MyDriver;
