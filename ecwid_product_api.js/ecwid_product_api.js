(function() {
  window.Ecwid = window.Ecwid || {};
  if (!('ProductAPI' in window.Ecwid)) {
    window.Ecwid.ProductAPI = (function() {
      var doJSONPrequest, papi_base_url;
      doJSONPrequest = function(url, callback) {
        var callbackname;
        if ('jQuery' in window && 'getJSON' in window.jQuery) {
          return window.jQuery.getJSON("" + url + "&callback=?", callback);
        } else {
          callbackname = 'jsonp_callback';
          if (callbackname in window.Ecwid.ProductAPI) {
            callbackname = (function() {
              var i;
              i = 1;
              while (("" + callbackname + "_" + i) in window.Ecwid.ProductAPI) {
                i++;
              }
              return "" + callbackname + "_" + i;
            })();
          }
          window.Ecwid.ProductAPI[callbackname] = function(json_data) {
            if (typeof callback === 'function') {
              callback(json_data);
            }
            return delete window.Ecwid.ProductAPI[callbackname];
          };
          return (function() {
            var jsonp_carrier;
            jsonp_carrier = window.document.createElement('script');
            jsonp_carrier.src = "" + url + "&callback=window.Ecwid.ProductAPI." + callbackname;
            return window.document.body.appendChild(jsonp_carrier);
          })();
        }
      };
      papi_base_url = function() {
        return "http://app.ecwid.com/api/v1/" + this.store_id;
      };
      function ProductAPI(store_id) {
        if (!(this instanceof ProductAPI)) {
          return new ProductAPI(store_id);
        } else {
          this.store_id = store_id;
        }
      }
      ProductAPI.prototype.categories = function(parent, callback) {
        if (parent == null) {
          parent = 0;
        }
        return doJSONPrequest("" + (papi_base_url()) + "/categories?parent=" + parent, callback);
      };
      ProductAPI.prototype.products = function(category, callback) {
        if (category == null) {
          category = 0;
        }
        return doJSONPrequest("" + (papi_base_url()) + "/products?category=" + category, callback);
      };
      ProductAPI.prototype.product = function(id, callback) {
        if (id == null) {
          id = 0;
        }
        return doJSONPrequest("" + (papi_base_url()) + "/product?id=" + id, callback);
      };
      ProductAPI.prototype.profile = function(callback) {
        return doJSONPrequest("" + (papi_base_url()) + "/profile", callback);
      };
      ProductAPI.prototype.random_products = function(count, callback) {
        if (count == null) {
          count = 1;
        }
        return doJSONPrequest("" + (papi_base_url()) + "/random_products?count=" + count, callback);
      };
      return ProductAPI;
    })();
  }
}).call(this);
