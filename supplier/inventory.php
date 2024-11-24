<?php include('session.php'); ?>
<?php include('header.php'); ?>
<body>
<?php include('navbar.php'); ?>
<div class="container">
<div style="height:50px;"></div>
	<div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">Product Inventory Report</h1>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <table width="100%" class="table table-striped table-bordered table-hover" id="prodTable">
                <thead>
                    <tr>
						<th class="hidden"></th>
                        <th>Inventory Date</th>
                        <th>User</th>
                        <th>Action</th>
						<th>Product Name</th>
						<th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
				<?php
					$sq=mysqli_query($conn,"select * from inventory left join product on product.productid=inventory.productid where product.supplierid='".$_SESSION['id']."' order by inventory_date desc");;
					while($sqrow=mysqli_fetch_array($sq)){
						
					?>
						<tr>
							<td class="hidden"></td>
							<td><?php echo date('M d, Y h:i A',strtotime($sqrow['inventory_date'])); ?></td>
							<td>
								<?php 
								$u=mysqli_query($conn,"select * from `user` left join customer on customer.userid=user.userid left join supplier on supplier.userid=user.userid where user.userid='".$sqrow['userid']."'");
								$urow=mysqli_fetch_array($u);
								if($urow['access']==1){
									echo "Admin";
								}
								elseif($urow['access']==2){
									echo $urow['customer_name'];
								}
								else{
									echo $urow['company_name'];
								}
								?>
							</td>
							<td><?php echo $sqrow['action']; ?></td>
							<td><?php echo $sqrow['product_name']; ?></td>
							<td><?php echo $sqrow['quantity']; ?></td>
						</tr>
					<?php
					}
				?>
                </tbody>
            </table>
        </div>
    </div>
</div>
<?php include('script.php'); ?>
<?php include('modal.php'); ?>
<?php include('add_modal.php'); ?>
<script src="custom.js"></script>
</body>
</html>