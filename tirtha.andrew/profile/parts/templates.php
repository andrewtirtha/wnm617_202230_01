<?

function makeProductList($r,$o) {
return $r.<<<HTML
<div class="col-xs-12 col-md-4">
   <a href="product_item.php?id=$o->id" class="product-item">
      <figure>
         <div class="product-image">
            <img src="img/$o->image_thumb" alt="">
         </div>
         <figcaption class="product-description">
            <div class="product-price">&dollar;$o->price</div>
            <div class="product-title">$o->title</div>
         </figcaption>
      </figure>
   </a>
</div>
HTML;
}



function makeCartList($r,$o) {
   $totalfixed = number_format($o->total,2,'.','');
   $selectamount = selectAmount($o->amount,10);

return $r.<<<HTML
<div class="display-flex">
   <div class="flex-none image-thumbs">
      <img src="img/$o->image_thumb">
   </div>
   <div class=flex-stretch>
      <strong>$o->title</strong>

      <form action="product_actions.php?action=delete-cart-item" method="post">
         <input type="hidden" name="product-id" value="$o->id">
         <input type="submit" value="Delete" class="form-button inline" style="font-size:0.8em;">
      </form>
   </div>

   <div class="flex-none">
      <div>&dollar;$totalfixed</div>
      <form action="product_actions.php?action=update-cart-item" method="post" onchange="this.submit()">
         <input type="hidden" name="product-id" value="$o->id">
         <div class="form-select" style="font-size:0.8em;">
            $selectamount
         </div>
      </form>
   </div>
</div>
HTML;
} 


function cartTotals() {
   $cart = getCartItems();

   $cartprice = array_reduce($cart,function($r,$o){return $r+$o->total;},0);

   $pricefixed = number_format($cartprice,2,'.','');
   $tax = number_format($cartprice*0.0725,2,'.','');
   $taxed = number_format($cartprice*1.0725,2,'.','');

return <<<HTML
<div class="card-section display-flex">
   <div class="flex-stretch"><strong>Sub Total</strong></div>
   <div class="flex-none">&dollar;$pricefixed</div>
</div>
<div class="card-section display-flex">
   <div class="flex-stretch"><strong>Taxes</strong></div>
   <div class="flex-none">&dollar;$tax</div>
</div>
<div class="card-section display-flex">
   <div class="flex-stretch"><strong>Total</strong></div>
   <div class="flex-none">&dollar;$taxed</div>
</div>
<div class="card-section">
   <a href="product_checkout.php" class="form-button">Checkout</a>
</div>
HTML;
}

function selectAmount($amount=1, $total=10) {
   $output = "<select name='product-amount'>";
   for($i=1;$i<=$total;$i++) {
      $output .= "<option ".($i==$amount?'selected':'').">$i</option>";
   }
   $output .= "</select>";
   return $output;
}



