import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/info')({
  component: Info,
})

function Info() {
  return (
<div data-tab="Info" className="tabs-body__item ">
    <form className="form" id="form-storage">
        <div className="form-group row">
            <div className="text-content">
                <p>
                    User Storage
                </p>
            </div>
        </div>
        <div className="form-group row">
            <div id="tableStorageInfo" className="table-specification">

            </div>
        </div>
        <div className="form-group row">
            <button type="submit" className="btn btn-turing-small-yellow">
                <span className="caption">Backup user data</span>
            </button>
        </div>
        <div className="form-group row"></div>
    </form>
    <form className="form" id="form-network">
        <div className="form-group row">
            <div className="text-content">
                <p>
                    Network interfaces
                </p>
            </div>
        </div>
        <div className="form-group row">
            <div id="tableNetworkInfo" className="table-specification">
            </div>
        </div>
        <div className="form-group row">
            <button type="submit" className="btn btn-turing-small-yellow">
                <span className="caption">Reset network</span>
            </button>
        </div>
        <div className="form-group row"></div>
    </form>
    <div className="form">
        <div className="form-group row">
            <div className="text-content">
                <p>
                    BMC
                </p>
            </div>
        </div>
        <div className="form-group">
            <button type="button" id="reboot-btn" className="btn btn-turing-small-red">
                <span className="caption">
                    Reboot
                </span>
            </button>
            <div id="reload-btn" className="btn btn-turing-small-dark">
                <span className="caption">
                    Reload daemon
                </span>
            </div>
        </div>
    </div>
</div>

  )
}
