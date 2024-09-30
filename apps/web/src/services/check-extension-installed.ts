export class CheckExtensionInstalled {

  private extensionId = 'fpidgjbohcfeomhcnhbdcmddnaknnben'

  public async execute() {
    try {
      await fetch(`chrome-extension://${this.extensionId}/manifest.json`)
      return true
    } catch (error) {
      return false
    }
  }
}
