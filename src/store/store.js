import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const state = {
	product: [],
	allProducts: [
		{
			image: "https://cf.shopee.vn/file/a582064110e86a0b25bd9d716b60102a",
			imgType: "~/assets/images/icon-drink3.png",
			name: "Pepsi BlackPink Black",
			rate_star: 4.9,
			price: 120,
			quantity: 1,
			inStore:  5,
		},
		{
			image: "https://cf.shopee.vn/file/3d968e66f6f853548b29715ff9d3e57a",
			imgType: "~/assets/images/icon-food4.png",
			rate_star: 4.6,
			name: "Mì 3 Miền Gold",
			price: 160,
			quantity: 1,
			inStore:  3,
		},
		{
			image: "https://cf.shopee.vn/file/ed7509e86fc53c58441261d228077ff5",
			imgType: "~/assets/images/icon-drink3.png",
			rate_star: 4.9,
			name: "Pepsi BlackPink Blue",
			price: 120,
			quantity: 1,
			inStore:  4,
		},
		{
			image: "https://cf.shopee.vn/file/058c8e631ce9a6b62f732ca746da905d",
			imgType: "~/assets/images/icon-drink4.png",
			rate_star: 4.8,
			name: "BIA BUDWEISER",
			price: 150,
			quantity: 1,
			inStore:  4,
		},
		{
			image: "https://cf.shopee.vn/file/138f51c12482ff55236594f33f45e2e9",
			imgType: "~/assets/images/icon-food4.png",
			rate_star: 4.7,
			name: "Omachi bò hầm",
			price: 160,
			quantity: 1,
			inStore:  6,
		},
		{
			image: "https://cf.shopee.vn/file/a80c5b29f626875ad719f8ea8014a22b",
			imgType: "~/assets/images/icon-drink2.png",
			rate_star: 4.9,
			name: "Trà Sữa Trân Châu",
			price: 250,
			quantity: 1,
			inStore:  2,
		},
		{
			image: "https://cf.shopee.vn/file/d64672d9562cc04791ff84ac624f7aa1",
			imgType: "~/assets/images/icon-food2.png",
			rate_star: 4.7,
			name: "Bánh Nhân Đậu Đỏ",
			price: 600,
			quantity: 1,
			inStore:  6,
		},
		{
			image: "https://cf.shopee.vn/file/508e70c6b9010431f6e40e431e3f7597",
			imgType: "~/assets/images/icon-drink2.png",
			rate_star: 4.5,
			name: "Cà Phê Phố",
			price: 380,
			quantity: 1,
			inStore:  4,
		},
		{
			image: "https://cf.shopee.vn/file/f952c36aae5bf8ef7deb6b22f6bf72b8",
			imgType: "~/assets/images/icon-drink4.png",
			rate_star: 4.5,
			name: "Bia StrongBow",
			price: 230,
			quantity: 1,
			inStore:  6,
		},
		{
			image: "https://cf.shopee.vn/file/28676ebfa2929894e22176979e635081",
			imgType: "~/assets/images/icon-drink2.png",
			rate_star: 4.2,
			name: "Nước Ngọt 7Up",
			price: 120,
			quantity: 1,
			inStore:  4,
		},
		{
			image: "https://cf.shopee.vn/file/ccf6fe6db188d39f6f5c54ff6ceabf1f",
			imgType: "~/assets/images/icon-food4.png",
			rate_star: 4.3,
			name: "Mì Hảo Hảo",
			price: 400,
			quantity: 1,
			inStore:  6,
		},
		{
			image: "https://cf.shopee.vn/file/c04b2bbdb773aefae50608444b54d2bd",
			imgType: "~/assets/images/icon-drink2.png",
			rate_star: 4.8,
			name: "Nước Ngọt C2",
			price: 100,
			quantity: 1,
			inStore:  1,
		},
	],
	imgsrc: null,
	name: null,
	price: null,
	quantity: null,
	inStore: null,
	user : null,
	avatar : null,
  	isLoginAccount : false,
  
	users : [
		{
			user:'trang',
			password:'123',
			conformPassWord:'123',
			avatar : "https://i.pinimg.com/originals/37/bd/5a/37bd5ad8cd801e7e0d340e7718ae5816.png",
		}
	],
  	comment: [
		{
			text : "15 FF",
			user :"Daxuo",
			avatar : "https://cdn.myminifactory.com//uploads/profile-images/09a9282508c8119710014f5cea02d9b3730282ba.jpg",
			like:1,
			isLike : false,
			time:"20:00:03",
			date:" 10 giờ trước"
		},
		{
			text : "Giao hàng nhanh",
			user :"Rosé",
			avatar : "https://afamilycdn.com/150157425591193600/2021/7/17/11c5c0f9094dbe9847a3974261992fc8-162649802882951039509.jpg",
			like:1,
			isLike : false,
			time:"18:30:50",
			date:"2 ngày trước"
		},
		{
			text : "Thực phẩm rất ngon",
			user :"Sơn Tùng",
			avatar : "https://2sao.vietnamnetjsc.vn/images/2021/07/08/16/13/st.jpg",
			like:1,
			isLike: false,
			time:"16:00:47",
			date:"1 ngày trước"
		},
  	],
};

const mutations = {
  
	price(state, price) {
		state.price = price;
	},
	quantity(state, quantity) {
		state.quantity = quantity;
	},
	name(state, title) {
		state.name = title;
	},
	img(state, imgsrc) {
		state.imgsrc = imgsrc;
	},
	inStore(state, inStore) {
		state.inStore = inStore;
	},
	deleteAll(state) {
		var check = false;
		for (var i = 0; i < state.allProducts.length; i++) {
			for (var x = 0; x < state.product.length; x++) {
				if (state.allProducts[i].name === state.product[x].title) {
					state.allProducts[i].inStore -= state.product[x].quantity;
					check = true;
				}
			}
		}
		
		if (check == true) {
			if (state.product.length > 0) {
				for (var i = 0; i < state.product.length; i++) {
					state.product.splice(state.product, state.product.length);
				}
			}
		}
	},
	delete(state, name) {
		if (state.product.length > 0) {
			for (var i = 0; i < state.product.length; i++) {
				if (state.product[i].title === name) {
					state.product.splice(i, 1);
				}
			}
		}
	},
	grow(state, name) {
		for (var i = 0; i < state.product.length; i++) {
			if (state.product[i].title === name) {
				state.product[i].quantity += 1;
			}
		}
	},
	low(state, name) {
		for (var i = 0; i < state.product.length; i++) {
			if (state.product[i].title === name) {
				state.product[i].quantity -= 1;
			}
		}
	},
	add(state) {
		var check = false;
		if (state.product.length > 0) {
			for (var i = 0; i < state.product.length; i++) {
				if (state.product[i].title === state.name) {
					check = true;
					if (
						state.product[i].quantity + state.quantity <=
						state.product[i].inStore && check == true
					) {
						state.product[i].quantity += state.quantity;
					} 
					else {
						confirm({
						title: "Thông báo",
						message: "Hết hàng !",
						okButtonText: "Ok",
						});
					}
				} else {
					check = false;
				}
			}
		}
		if (check == false) {
			for (var i = 0; i < state.allProducts.length; i++) {
				if (state.allProducts[i].name === state.name) {
					if (state.allProducts[i].inStore == 0){
						confirm({
						title: "Thông báo",
						message: "Hết hàng !",
						okButtonText: "Ok",
						});
					}
					else {
						state.product.push({
							imgsrc: state.imgsrc,
							title: state.name,
							price: state.price,
							quantity: state.quantity,
							inStore: state.inStore,
						});
					}
				}
			}
		}
	},
	changeAvatar(state,avatar){
		state.avatar = avatar
	},
	changeLoginAccount(){
		state.isLoginAccount = true
	},
	changeUser(state,user){
		state.user = user
	},
  
};
export default new Vuex.Store({
  	state,
  	mutations,
});