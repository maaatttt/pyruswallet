<article class="modal fade" id="customNodeModal" tabindex="-1">
  <section class="modal-dialog">
    <section class="modal-content">

      <div class="modal-body">
        <button type="button" class="close" data-dismiss="modal">&times;</button>

        <h2 class="modal-title text-info" translate="NODE_Title"> Set Up Your Custom Node </h2>

        <p class="small" ng-show="browserProtocol!='https:'">
          <strong translate="NODE_Subtitle">To connect to a local node...</strong>
          <ul class="small">
            <li> URL: http://127.0.0.1</li>
            <li> Port: 8588 </li>
            <li> Run gubiq: <code>gubiq --rpc --rpccorsdomain "null" --keystore "dont_put_secret_files_here_ever"</code></li>
            <li> Run Parity: <code>parity --rpccorsdomain "*" --keys-path "dont_put_secret_files_here_ever"</code></li>
          </ul>
        </p>

        <div ng-show="browserProtocol=='https:'" class="alert alert-danger small" translate="NODE_Warning">
          Your node must be HTTPS in order to connect to it via MyEtherWallet.com. You can [download the MyEtherWallet repo & run it locally](https://github.com/kvhnuke/etherwallet/releases/latest) to connect to any node. Or, get free SSL certificate via [LetsEncrypt](https://letsencrypt.org/)</a>.
        </div>

        <section class="row">
          <div class="clearfix col-xs-12">
            <label translate="NODE_Name">Node Name</label>
            <input class="form-control"
                   type="text"
                   placeholder="My ETH Node"
                   ng-model="customNode.name"
                   ng-class="Validator.isAlphaNumericSpace(customNode.name) ? 'is-valid' : 'is-invalid'">
          </div>

          <div class="clearfix col-xs-9">
            <label>URL</label>
            <input class="form-control" type="text" placeholder="https://127.0.0.1" ng-model="customNode.url" ng-class="checkNodeUrl(customNode.url) ? 'is-valid' : 'is-invalid'">
          </div>

          <div class="clearfix col-xs-3">
            <label class="NODE_Port">Port</label>
            <input class="form-control" type="text" placeholder="8588" ng-model="customNode.port" ng-class="Validator.isPositiveNumber(customNode.port) || customNode.port=='' ? 'is-valid' : 'is-invalid'">
          </div>

          <div class="clearfix col-xs-12 radio">
            <label><input name="options" type="radio" ng-model="customNode.options" value="eth"> ETH </label>
            <label><input name="options" type="radio" ng-model="customNode.options" value="etc"> ETC </label>
            <label><input name="options" type="radio" ng-model="customNode.options" value="rop"> Ropsten </label>
            <label><input name="options" type="radio" ng-model="customNode.options" value="cus"> Custom </label>
            <label><input type="checkbox" ng-model="customNode.eip155" value="true"> Supports EIP-155 </label>
          </div>

          <div class="clearfix col-sm-6 col-sm-offset-6" ng-show="customNode.eip155">
            <label>Chain ID</label>
            <input class="form-control" type="text" placeholder="" ng-model="customNode.chainId" ng-class="Validator.isPositiveNumber(customNode.chainId) ? 'is-valid' : 'is-invalid'">
          </div>
        </section>

      </div>

      <div class="modal-footer">
        <button class="btn btn-default" data-dismiss="modal" translate="x_Cancel">
          Cancel
        </button>
        <button class="btn btn-primary" ng-click="saveCustomNode()" translate="NODE_CTA">
          Save & Use Custom Node
        </button>
      </div>


    </section>
  </section>
</article>
