import { Command } from "./signal";

const { RFDevice } = require('homey-rfdriver');

class MyDevice extends RFDevice {

  static RX_ENABLED = true;

  async onCommandMatch(command: any) {
    const data = await this.getData();
    return data.address === command.address && data.btn === command.btn;
  }

  async onCommandFirst(command: any) {
    this.homey.log(`Received command: ${JSON.stringify(command)}`);

    await this.homey.flow
      .getDeviceTriggerCard('ringbell:received')
      .trigger(this, {}, {});
  }

  static CAPABILITIES = {
    button: ({ value, data }: any): Command => ({
      address: data.address,
      btn: data.btn,
    }),
  };

}

module.exports = MyDevice;
