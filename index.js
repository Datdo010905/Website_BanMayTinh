var n=7;
var i=1;


function next(){
	if(i==n)
		i=1;
	else
		i++;
	// Thêm hiệu ứng fade out
        var img = document.getElementById("slideshow_img");
        img.style.opacity = 0;
	
	// Sau khi fade out hoàn tất, đổi ảnh và fade in
        setTimeout(function() {
            img.setAttribute("src", "img/SLIDE/slideshow_" + i + ".jpg");
            img.style.opacity = 1;
        }, 1000); // Thời gian fade out
}

function autoplay(){
	setInterval(next, 3000)
}


//

function slide(i) {
  document.getElementById("slide_msi").src = `img/MANHINH/MSI_Optix_MAG322CQRV_v${i}.png`;
}
function slide1(i) {
  document.getElementById("slide_asus").src = `img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T_v${i}.png`;
}


//thêm giỏ hàng
$(document).ready(function(){

	var orderDetails = "";
	$(".item").find(".gia").click(function(){
		var sanpham = $(this).parent();
		var name = sanpham.find(".product-name").text();
		var price = sanpham.find(".product-price").text();
		var photo = sanpham.find(".pic_item").attr("src");

		var order = {
			'name' : name,
			'price': price,
			'photo': photo,
			'soluong': 1
		}		
			//chuyển thành chuỗi JSON cách nhau bởi dấu phẩy
		orderDetails += "," + JSON.stringify(order);
		
		if(orderDetails.substring(0,1)==",")
			orderDetails = orderDetails.substring(1);
		
		//ném chuỗi vào [] thành 1 mảng json hợp lệ
		localStorage.setItem("orderDetails", "["+orderDetails+"]");
		
		alert("Đã thêm vào giỏ hàng thành công! Hãy kiểm tra giỏ hàng.");
	});
});

//thêm giỏ hàng msi
$(document).ready(function(){

	var orderDetails = "";
	$(".product").find(".btnAdd").click(function(){
		var sanpham = $(this).parent();
		var name = sanpham.find(".name_item").text();
		var price = sanpham.find(".giamoi").text();
		var photo = "img/MANHINH/MSI_Optix_MAG322CQRV.png";

		var order = {
			'name' : name,
			'price': price,
			'photo': photo,
			'soluong': 1
		}		
			//chuyển thành chuỗi JSON cách nhau bởi dấu phẩy
		orderDetails += "," + JSON.stringify(order);
		
		if(orderDetails.substring(0,1)==",")
			orderDetails = orderDetails.substring(1);
		
		//ném chuỗi vào [] thành 1 mảng json hợp lệ
		localStorage.setItem("orderDetails", "["+orderDetails+"]");
		
		alert("Đã thêm vào giỏ hàng thành công! Hãy kiểm tra giỏ hàng.");
	});
});
//thêm giỏ hàng asus
$(document).ready(function(){

	var orderDetails = "";
	$(".product").find(".btnAdd2").click(function(){
		var sanpham = $(this).parent();
		var name = sanpham.find(".name_item").text();
		var price = sanpham.find(".giamoi").text();
		var photo = "img/LAPTOP/Laptop_ASUS_ZenBook_UX325EA_EG079T.jpg";

		var order = {
			'name' : name,
			'price': price,
			'photo': photo,
			'soluong': 1
		}		
			//chuyển thành chuỗi JSON cách nhau bởi dấu phẩy
		orderDetails += "," + JSON.stringify(order);
		
		if(orderDetails.substring(0,1)==",")
			orderDetails = orderDetails.substring(1);
		
		//ném chuỗi vào [] thành 1 mảng json hợp lệ
		localStorage.setItem("orderDetails", "["+orderDetails+"]");
		
		alert("Đã thêm vào giỏ hàng thành công! Hãy kiểm tra giỏ hàng.");
	});
});




$(document).ready(function() {
    // Khởi tạo giỏ hàng
    const cart = {
        init: function() {
            this.display();// Hiển thị giỏ hàng ban đầu
            this.bindEvents();// Gắn các sự kiện
        }, 
		
    // Hiển thị giỏ hàng
    display: function()
		{
			//lấy data từ localStore
			const data = this.getCartData();
			let content = "";
			let total = 0;
			
			//duyệt qua các sp
			if (data && data.length > 0) {
				// Hiển thị sản phẩm
				data.forEach((item, index) => {
					const price = this.parsePrice(item.price);//chuyển từ text giá sang số
					total += price * item.soluong;//tính tổng
					
					content += this.createCartItem(item, index);// Tạo HTML cho mỗi item
				});
				
				// Thêm tổng tiền và nút thanh toán
				content += this.createCartFooter(total);
			}
			else 
			{
				content = this.createEmptyCart();// Hiển thị giỏ hàng trống
			}
			//gắn vào html
			$("#content").html(content);
        },
        
        // Xử lý sự kiện
        bindEvents: function() 
		{
			
            $(document)
				//xóa từng sp
				.on('click', '.order-action input[type="button"]', (e) => {
					//vị trí sp
					const index = $(e.currentTarget).data('index');
					if(confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
                        this.removeItem(index);
						this.display();
                    alert("Đã xóa sản phẩm khỏi giỏ hàng!");
                    }

                })
				//thanh toán
                .on('click', '.checkout-btn', () => {
					if(confirm('Bạn có muốn thanh toán không?'))
					{
						alert('Chuyển đến trang thanh toán!');
						window.location.href = 'thanhtoan.html';
					}
                })
				//xóa toàn bộ giỏ hàng
                .on('click', '#clear-cart', () => {
                    if(confirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?')) {
                        this.clearCart();
                        this.display();//hiển thị
                        alert('Đã xóa toàn bộ giỏ hàng!');
                    }
                })
				
				
				// tăng số lượng
				.on('click', '.btn.tang', (e) => {
					const index = $(e.currentTarget).data('index');
					this.updateQuantity(index, 1); // Tăng 1
					this.display();//hiển thị
				})
				
				// giảm số lượng
				.on('click', '.btn.giam', (e) => {
					const index = $(e.currentTarget).data('index');
					this.updateQuantity(index, -1); // Giảm 1
					this.display();//hiển thị
				});
        },
        
		// Lưu giỏ hàng
        saveCart: function(data) {
			//Chuyển đổi mảng thành chuỗi JSON
            localStorage.setItem("orderDetails", JSON.stringify(data));
        },
        
        // Xóa toàn bộ giỏ hàng
        clearCart: function() {
            localStorage.removeItem("orderDetails");
        },
		
        // Lấy dữ liệu giỏ hàng từ localStorage
        getCartData: function() {
            const data = localStorage.getItem("orderDetails");
			//nếu khác null thì chuyển chuỗi JSON sang mảng
            return data ? JSON.parse(data) : null;
        },
        
        // Xóa sản phẩm khỏi giỏ hàng
        removeItem: function(index) {
			//lấy dữ liệu từ pthuc getCartData
            const data = this.getCartData();
			//có data
            if (data) {
				//xóa 1 sp tại index
                data.splice(index, 1);
				//lưu lại cart
                this.saveCart(data);
            }
        },
        
        
        
        // Chuyển đổi giá từ string sang number
        parsePrice: function(priceString) {
			//Loại bỏ tất cả ký tự không phải số (giữ lại 0-9)
			//trả về 0 nếu KQ ko là số
            return parseInt(priceString.replace(/[^\d]/g, '')) || 0;
        },
		
		//cập nhật sl
        updateQuantity: function(index, change) {
			//lấy data
		const data = this.getCartData();
		//check sluong
		if (data && data[index]) {
			data[index].soluong += change;
        
			// Đảm bảo số lượng không nhỏ hơn 1
			if (data[index].soluong < 1) {
				data[index].soluong = 1;
			} 
				this.saveCart(data)//lưu lại;
			}
		},
        // Định dạng tiền VND
        formatPrice: function(amount) {
            return new Intl.NumberFormat('vi-VN', { 
                style: 'currency', 
                currency: 'VND' 
            }).format(amount);
        },
        
        // Tạo HTML cho 1 sản phẩm trong giỏ hàng
        createCartItem: function(item, index) {
            return `
                <div class="order-item">
				
                    <div class="order-photo"><img src='${item.photo}' /></div>
					
                    <div class="order-name">${item.name}</div>				                
					
					<div class="order-quantity">
						<button class="btn giam" data-index="${index}">-</button>
						<span class="qty-value">${item.soluong}</span>
						<button class="btn tang" data-index="${index}">+</button>
					</div>
			
					<div class="order-price">${this.formatPrice(this.parsePrice(item.price) * item.soluong)}</div>
			
                    <div class="order-action">
                        <input type="button" value="Xóa" data-index="${index}" />
                    </div>
					
                </div>`;
        },
        
        // Tạo HTML cho phần tổng tiền và thanh toán
        createCartFooter: function(total) {
            return `
                <div class="cart-footer">
				
                    <div class="total-price">Tổng tiền: ${this.formatPrice(total)}</div>
					
                    <button class="checkout-btn">Thanh toán</button>
					
                </div>`;
        },
        
        // Tạo HTML khi giỏ hàng trống
        createEmptyCart: function() {
            return `
                <div class="empty-cart">
				
                    <img src="img/empty_cart.png" alt="Giỏ hàng trống">
					
                    <h2>Giỏ hàng của bạn đang trống</h2>
					
                    <p>Hãy khám phá các sản phẩm tuyệt vời và thêm chúng vào giỏ hàng nhé!</p>
					
                    <a href="index.html" class="continue-shopping">Tiếp tục mua sắm</a>
					
                </div>`;
        }
    };
    
    // Khởi chạy giỏ hàng
    cart.init();
});


$(document).ready(function(){

		var user = "";
		$(".form").find("#dangky").click(function(e){
			e.preventDefault();
			var thongtin = $(this).parent();
			var ho = thongtin.find("#ho").val().trim();
			var ten = thongtin.find("#ten").val().trim();
			var email = thongtin.find("#email").val().trim();
			var sdt = thongtin.find("#sdt").val().trim();
			var tk = thongtin.find("#tk").val().trim();
			var mk = thongtin.find("#mk").val().trim();
			var xnmk = thongtin.find("#xnmk").val().trim();

			var taikhoan = {
				'ho' :	ho,
				'ten':	ten,
			  'email':	email,
				'sdt':	sdt,
				 'tk':	tk,
				 'mk':	mk,
			   'xnmk':	xnmk
			   
			}		
			if(mk == xnmk)
			{
				
				//chuyển thành chuỗi JSON cách nhau bởi dấu phẩy
				user += "," + JSON.stringify(taikhoan);
				
				if(user.substring(0,1)==",")
					user = user.substring(1);
				
				//ném chuỗi vào [] thành 1 mảng json hợp lệ
				localStorage.setItem("user", "["+user+"]");
				
				alert("Đã đăng ký thành công!");
				window.location.href = 'login.html';
			}
			else{
				alert("Đăng ký thất bại!");
			}
		});
});


$(document).ready(function(){
	
		// Kiểm tra trạng thái đăng nhập khi tải trang
		if(localStorage.getItem("trangthai") === "true") {
			var nguoidung = localStorage.getItem("nguoidung") || '';
			$("#a_log").html('<a href="#" id="logout">Xin chào ' + nguoidung + ' '+',Đăng xuất</a>');
			$("#logout").click(function(e) {
				e.preventDefault();
				localStorage.removeItem("trangthai");
				localStorage.removeItem("nguoidung");
				alert("Đã đăng xuất!");
				window.location.href = 'login.html';
			});
		} else {
			$("#a_log").html('<a title="Đăng nhập để làm Dmember của DanyLap" href="login.html">Login</a>');
		}
		
		$(".form").find("#dangnhap").click(function(e){
			e.preventDefault(); // Ngăn form submit nếu là nút submit
			var thongtin = $(this).parent();
			var tk = thongtin.find("#tk").val().trim();
			var mk = thongtin.find("#mk").val().trim();
			//lấy data từ localStore
			const user = JSON.parse(localStorage.getItem("user")) || [];
			const kiemtra = user.find(u => u.tk === tk && u.mk === mk);
			if(kiemtra)
			{
				alert("Đã nhập thành công!");
				// Lưu trạng thái đăng nhập
				localStorage.setItem("trangthai", "true");
				localStorage.setItem("nguoidung", tk);
				window.location.href = 'index.html';
			}
			else{
				alert("Đăng nhập thất bại!");
			}
			
			
		});
});



$(document).ready(function(){

		var giaohang = "";
		$(".form").find("#thanhtoan").click(function(){
			var thongtin = $(this).parent();
			var hoten = thongtin.find("#hoten").val().trim();
			var email = thongtin.find("#email").val().trim();
			var sdt = thongtin.find("#sdt").val().trim();
			var tinh = thongtin.find("#tinh").val().trim();
			var huyen = thongtin.find("#huyen").val().trim();
			var xa = thongtin.find("#xa").val().trim();
			
			//var hinhthuc = thongtin.find("input[type="radio"]");
			
			var thongtingiaohang = {
				'hoten' :	hoten,
				'email':	email,
				'sdt':	sdt,
				'tinh': tinh,
				'huyen': huyen,
				'xa': xa
			}		
			if(hoten != "" && sdt != "" && tinh != "" && huyen != "" && xa != "" && tinh != "") //&& hinhthuc.selected == true)
			{
				
				//chuyển thành chuỗi JSON cách nhau bởi dấu phẩy
			giaohang += "," + JSON.stringify(thongtingiaohang);
			
			if(giaohang.substring(0,1)==",")
				giaohang = giaohang.substring(1);
			
			//ném chuỗi vào [] thành 1 mảng json hợp lệ
			localStorage.setItem("giaohang", "["+giaohang+"]");
			
			alert(`Chúng tôi sẽ giao hàng đến ${tinh} - ${huyen} - ${xa} sớm nhất có thể! Hãy mua hàng tiếp nhé:))`);

			}
			else{
				alert("Thanh toán thất bại!");
			}
		});
});

//đăng nhập admin
$(document).ready(function(){

		$(".form").find("#dangnhapadmin").click(function(e){
			e.preventDefault(); // Ngăn form submit nếu là nút submit
			var thongtin = $(this).parent();
			var tk = thongtin.find("#tk").val().trim();
			var mk = thongtin.find("#mk").val().trim();
			//lấy data từ localStore
			const admin = JSON.parse(localStorage.getItem("admin")) || [];
			const kiemtra = admin.find(u => u.tk === tk && u.mk === mk);
			if(kiemtra)
			{
				alert("Đã đăng nhập admin thành công!");
				// Lưu trạng thái đăng nhập
				localStorage.setItem("trangthai", "true");
				localStorage.setItem("nguoidung", tk);
				window.location.href = 'quantri.html';
			}
			else{
				alert("Đăng nhập admin thất bại!");
			}
			
			
		});
});