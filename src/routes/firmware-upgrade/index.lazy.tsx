import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/firmware-upgrade/')({
  component: FirmwareUpgrade,
})

function FirmwareUpgrade() {
  return (
<div data-tab="Firmware Upgrade" id="firmware-upgrade-tab" className="tabs-body__item ">
    <form className="form" id="firmware-upgrade-form">
        <div className="form-group row">
            <div className="text-content">
                <p>
                    Upgrade BMC firmware:
                </p>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="firmware-upgrade-file-id" className="input-wrap input-type-file-wrap active">
                <span className="label">.tpu file</span>
                <input type="text" className="file-upload-input" />
                <input type="file" name="file" id="firmware-upgrade-file-id" className="form-control" accept=".tpu,.tpu.xz" readOnly />
            </label>
        </div>
        <div className="form-group row">
            <label htmlFor="firmware-upgrade-sha256" className="input-wrap input-type-file-wrap active">
                <span className="label">Sha256: (optional)</span>
                <input type="text" className="upgrade-sha256" id="firmware-upgrade-sha256" />
            </label>
        </div>
        <div className="form-group">
            <button disabled type="submit" className="btn btn-turing-small-yellow">
                <span className="caption">
                    Upgrade
                </span>
            </button>
        </div>
        <div id="firmware-progress-group" className="progress-bar-group form-group row">
            <div className="progress-bar-wrap">
                <div className="progress-bar" style={{ width: '0%' }}></div>
                <div className="progress-bar-caption"></div>
            </div>
            <div className="update-text"></div>
        </div>
    </form>
</div>

  )
}
