(function () {
    // Bind a change handler to the window location.
    $j( window.location ).bind(
        "change",
        function(objEvent, objData){
            var hash = objData.currentHash.slice(6);  //trim the ecwid and the COLON leading.
            var page = {
                mode: getPageType(hash),
                category: getCategory(hash),
                product: getProduct(hash)
            };
            runMods(page);  //If the window's changed, run the mods.
        }
        );

    function runMods(page) {
        //Call anything you want on every page here.
        functionComplete = false;  //They all retrun true if successful. false if not.
        if (window.t1 !== undefined) {
            clearInterval(t1);
        }

        t1 = setInterval (function() {
            switch(page.mode) {
                case "product":
                    functionComplete = process_product(page.product);
                    break;
                default:
                    //Nothing to do!
                    functionComplete = true;
            }

            if (functionComplete) {
                clearInterval(t1);
            }
        }, 100);
    }

    /*var ecwid_callforprice_products = [];  // irrelevant in this solution, can be safely removed
    ecwid_callforprice_products['4064'] = true;
    ecwid_callforprice_products['4037'] = true;
    // ecwid_callforprice_products['PRODUCT_ID'] = true; */

    function process_product(product_id) {
        var $call_for_price = $j('span#ecwid_call_for_price');;
        var $button = $j('div.ecwid-AddToBagButton');
        var $price = $j('div.ecwid-productBrowser-price');
        var $in_the_bag = $j('div.ecwid-productBrowser-details-inTheBag');


        if (!$button.length || !$price.length) {
            return false;
        } else {
            if($price.text() == '$0.00') {
                if (!$call_for_price.length) {
                    $call_for_price = $j('<span id="ecwid_call_for_price"><br />Call for price</span>').insertAfter($button);
                }
                $button.hide();
                $price.hide();
                $call_for_price.show();
            } else {
                if (!$in_the_bag.length) {
                    $button.show();
                }
                $price.show();
                $call_for_price.hide();
            }
        }
        return true;
    }
}
)();
