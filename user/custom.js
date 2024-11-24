
$(document).ready(function(){
	
	$(document).on('click', '.addcart', function(){
		var pid=$(this).val();
		if ($('#cart'+pid).is(':visible')){
			$('#cart'+pid).hide();	
		}
		else{
			$('#cart'+pid).show();
		}
	});
	
	$(document).on('click', '.concart', function(){
		var pid=$(this).val();
		var qty=$('#qty'+pid).val();
		$('#cart'+pid).hide();
		if (qty.match(/^\d+$/)){
			
			$.ajax({
				url:"add_cart.php",
				method:"POST",
				data:{
					id: pid,
					qty: qty,
					cart: 1,
				},
				success:function(data){
					if(data!=""){
						alert(data);
					}
					else{
						showCart();
					}
				}
			});
			
		}
		else if (qty==""){
			alert('Please enter Quantity');
		}
		else{
			alert('Please Enter a Numeric Value');
		}
	});
	
	$(document).on('click', '.remove_product', function(){
		var pid=$(this).val();
			$.ajax({
				url:"del_product.php",
				method:"POST",
				data:{
					id: pid,
					rem: 1,
				},
				success:function(){
					showCart();
				}
			});
	});
	
	$(document).on('click', '#close_cart', function(){
		closeCart();
	});
	
	$(document).on('click', '#cart_control', function(){
		if($('#cart_area').is(':visible')){
			closeCart();
		}
		else{
			showCart();
		}
	});
	
	$(document).on('click', '#check', function(){
		var total=$('#total').text();
		window.location.href='confirm_check.php?total='+total;
	});
	
	$(document).on('click', '.remove_prod', function(){
		var prodid=$(this).val();
		$.ajax({
			url:"del_product.php",
			method:"POST",
			data:{
				id: prodid,
				rem: 1,
			},
			success:function(data){
				showCheckout();
			}
		});
	});
	
	$(document).on('click', '.minus_qty', function(){
		var prodid=$(this).val();
		$.ajax({
			url:"minus_cart.php",
			method:"POST",
			data:{
				id: prodid,
				min: 1,
			},
			success:function(){
				showCart();
			}
		});
	});
	
	$(document).on('click', '.minus_qty2', function(){
		var prodid=$(this).val();
		$.ajax({
			url:"minus_cart.php",
			method:"POST",
			data:{
				id: prodid,
				min: 1,
			},
			success:function(){
				showCheckout();
			}
		});
	});
	
	$(document).on('click', '.add_qty', function(){
		var prodid=$(this).val();
		$.ajax({
			url:"plus_cart.php",
			method:"POST",
			data:{
				id: prodid,
				add: 1,
			},
			success:function(){
				showCart();
			}
		});
	});
	
	$(document).on('click', '.add_qty2', function(){
		var prodid=$(this).val();
		$.ajax({
			url:"plus_cart.php",
			method:"POST",
			data:{
				id: prodid,
				add: 1,
			},
			success:function(){
				showCheckout();
			}
		});
	});
	
	$("#search").keyup(function() {
		var name = $('#search').val();
		if (name == "") {
			$("#search_area").hide();
		}
		else {
			$.ajax({
			type: "POST",
			url: "search_num.php",
			data: {
				name: name,
				num: 1
			},
			success: function(num) {
				showSearch(num, name);
			}
			});
		}
	});
	
});

function showCart(){
	$.ajax({
		url:"fetch_cart.php",
		method:"POST",
		data:{
			fcart: 1,
		},
		success:function(response){
			$('#cart_area').html(response);
			$('#cart_box').show();
			$('#cartme').addClass('active');
			$("#cart_area").scrollTop($("#cart_area")[0].scrollHeight);
		}
	});
}

function showSearch(num, name){
	var height;
	if (num==0){
		height=40;
	}
	else if(num>=5){
		height=200;
	} 
	else{
		height=40*num;
	}
	$.ajax({
		url:"search.php",
		method:"POST",
		data:{
			name: name,
			ss: 1,
		},
		success:function(response){
			$('#search_area').html(response).show();
			$('#search_area').height(height);
		}
	});
}

function closeCart(){
	$('#cart_box').hide();
	$('#cartme').removeClass('active');
}

function showCheckout(){
	$.ajax({
		url:"fetch_checkout.php",
		method:"POST",
		data:{
			check: 1,
		},
		success:function(response){
			$('#checkout_area').html(response);
		}
	});
}
