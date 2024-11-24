<?php
	include('session.php');
	if(isset($_POST['num'])){
		$search = $_POST['name'];
		$query=mysqli_query($conn,"select * from `product` where product_name like '%$search%'");
		echo mysqli_num_rows($query);
	}
?>