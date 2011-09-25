window.Ecwid = window.Ecwid or {}

unless 'ProductAPI' of window.Ecwid then class window.Ecwid.ProductAPI
  doJSONPrequest = (url, callback)->
    if 'jQuery' of window and 'getJSON' of window.jQuery
      window.jQuery.getJSON "#{url}&callback=?", callback
    else
      # we need to make our own function
      callbackname = 'jsonp_callback'
      if callbackname of window.Ecwid.ProductAPI
        callbackname = do ()->
          i = 1
          while "#{callbackname}_#{i}" of window.Ecwid.ProductAPI
            i++ 
          "#{callbackname}_#{i}"

      window.Ecwid.ProductAPI[callbackname] = (json_data) ->
        if typeof callback is 'function'
          callback json_data
        delete window.Ecwid.ProductAPI[callbackname]
      
      # now make JSONP request
      do ()->
        jsonp_carrier = window.document.createElement 'script'
        jsonp_carrier.src = "#{url}&callback=window.Ecwid.ProductAPI.#{callbackname}"
        window.document.body.appendChild jsonp_carrier

  papi_base_url = ()->
    "http://app.ecwid.com/api/v1/#{@store_id}"
  
  constructor: (store_id) ->
    if not (this instanceof ProductAPI) 
      return new ProductAPI store_id; 
    else
  	  @store_id = store_id

  categories: (parent = 0, callback)->
    doJSONPrequest("#{papi_base_url()}/categories?parent=#{parent}", callback)

  products: (category=0, callback)->
    doJSONPrequest("#{papi_base_url()}/products?category=#{category}", callback)

  product: (id=0, callback)->
    doJSONPrequest("#{papi_base_url()}/product?id=#{id}", callback)

  profile: (callback)->
    doJSONPrequest("#{papi_base_url()}/profile", callback)

  random_products: (count=1, callback)->
    doJSONPrequest("#{papi_base_url()}/random_products?count=#{count}", callback)