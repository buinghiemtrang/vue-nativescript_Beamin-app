<template>
    <Page>
		<ActionBar>
			<GridLayout columns="auto,*,30,auto" rows="auto">
				<Label class="fas header__icon" :text="icon_back | fonticon" col="0" row="0" @tap="$navigateBack(App)"/>
                <Label class="header__title" text="Tất cả sản phẩm" col="1" row="0"/>
				<Label class="fas header__icon" :text="icon_cart | fonticon" marginTop="3" 
					marginRight="5" col="2" row="0" @tap="showCart()"/>
				<Label :text="numberCart" fontSize="15" marginBottom="10" fontWeight="bold"  marginRight="5" col="3" row="0"/>
			</GridLayout>
        </ActionBar>
		<GridLayout orientation="vertical" width="100%" height="100%" columns="*" rows="*,auto">
			<ScrollView>
				<StackLayout col="0" row="0">
					<TextField col="0" row="0" v-model="searching" class="fas header__search" hint=" Tìm món ăn, đồ uống !" />
					<GridLayout columns="100,60,60" rows="auto" margin="10">
						<Label col="0" row="0" text="Giá :" fontSize="18" fontWeight="bold" color="#333" paddingTop="20"/>
						<Button col="1" row="0" class="fas btn-short" @tap="changeValue(1)" :text="icon_up | fonticon"/>
						<Button col="2" row="0" class="fas btn-short" @tap="changeValue(-1)" :text="icon_down | fonticon"/>
					</GridLayout>
					<ListView  class="list-product" v-for="item in filterName" :key="item">
						<v-template>
							<GridLayout columns="auto,200,50" rows="auto" class="fa group-item">
								<Image class="img-product" height="110" width="110" :src="item.image" col="0" 
									row="0" @tap="showDetailProduct(item)"/>
								<Stacklayout marginTop="20" col="1" row="0">
									<GridLayout columns="20,auto" rows="auto, auto, auto, auto" marginLeft="20">
										<Image col="0" row="0"  width="20" :src="item.imgType" />
										<Label col="1" row="0" color="#333" fontSize="16" :text="item.name" />
										<Label col="1" row="1" color="#111" fontSize="14" fontWeight="bold" :text=" item.price | dollars" />
										<!-- <Label col="1" row="2" color="#111" paddingTop="3" fontSize="14" :text="'Số lượng : ' + item.inStore" /> -->
										<Label col="0" row="3" color="#FFC312" paddingTop="7"  class="fas" :text="icon_star | fonticon "/>
										<Label col="1" row="3" paddingTop="7" :text="item.rate_star"/>
									</GridLayout>
								</Stacklayout>
								<Stacklayout col="2" row="0" paddingTop="45" >
									<Button col="2" row="0" class="far btn-add" :text="icon_plus | fonticon" height="50" width="50" 
										@tap="onBuy(item.image,item.name,item.price,item.quantity,item.inStore)"/>
								</Stacklayout>
							</GridLayout>
						</v-template>
					</ListView>
				</StackLayout>
			</ScrollView>
		</GridLayout>
    </Page>
</template>

<script>
import DetailProduct from './DetailProduct.vue'
import CartProduct from './Cart.vue'
export default {
	// props: ["name"],
    data() {
      	return {
			icon_back: 'fa-arrow-left',
			icon_cart: "fa-shopping-cart",
            icon_heart: "fa-heart",
			icon_search: "fa-search",
			icon_star: "fa-star",
			icon_plus: "fa-plus-square",
			icon_up: "fa-sort-numeric-up",
			icon_down: "fa-sort-numeric-up-alt",
			allProducts: this.$store.state.allProducts,
			onSort: 0,
			searching: "",
			product: this.$store.state.product,
			user: this.$store.state.user

		}  
    },
	filters: {
		dollars: (num) => `$${num / 100}`,
	},
	computed: {	
		filterName: function() {

			if (this.onSort){
				this.allProducts = this.allProducts.sort((a, b) => {
					if (a.price > b.price) return this.onSort
					else if (a.price < b.price) return - this.onSort
					else return 0
				})
			}
			if (this.searching == null) {
				return this.allProducts;
			} 
			else {
				if (this.searching) {
					return this.allProducts.filter((item) => {
						return item.name
						.toLowerCase()
						.includes(this.searching.toLowerCase());

					});
				} 
				else {
					return this.allProducts;
				}
			}
    	},
		numberCart(){
			var x = 0
			for (var i = 0; i < this.product.length; i++){
				x += this.product[i].quantity
			}
			return x
		},
	},
	methods:{
		changeValue(value){
			this.onSort = value
		},
		onBuy(img,title,price,quantity,inStore){
			if (this.user != null){
				this.$store.commit('img',img)
				this.$store.commit('name',title)
				this.$store.commit('price',price)
				this.$store.commit('quantity',quantity)
				this.$store.commit('inStore',inStore)
				this.$store.commit('add')
			}
			else  {
                confirm({
                    title: "Thông báo",
                    message: "Bạn cần đăng nhập trước khi mua hàng!",
                    okButtonText: "Ok",
                });
            } 
		},
		showDetailProduct(item) {
			this.$navigateTo(DetailProduct, {
				props: {
				    image: item.image,
				    title: item.name,
				    price: item.price,
				    inStore: item.inStore,
				},
				animated: true,
				transition: {
					name: "slideLeft",
					duration: 250,
					curve: "easeIn",
				},
			});
		},
	   	showCart(){
			this.$navigateTo(CartProduct,{
				animated: true,
				transition: {
					name: "slideLeft",
					duration: 250,
					curve: "easeIn",
				},
			});
		},
	}
}
</script>

<style scoped>
	ActionBar{
		text-align: center;
	}

	.header__title{
		font-weight: 500;
		font-size: 20px;
		color: #222;
        padding-left: 10px;
	}

	.header__search{
		margin-top: 10px;
		color: #636e72;
		background-color: #dfe6e9;
		padding-left: 20px;
		border-radius: 20%;
		width: 80%;
		font-size: 14px;
		text-align: center;
	}

	.header__icon{
		font-size: 20px;
	}

    .text-style{
		text-decoration: underline;
	}

	.list-product{
		margin: 40px 0 50px 0;
		height: 2700px;
	}

	.img-product{
		border-radius: 10px;
		padding: 25px;
	}

	.btn-add{
		font-size: 15px;
		color: #fff;
		background-color: #81ecec;
	}
	.btn-short{
		color: #fff;
		background-color: #ee5253;
		font-size: 20px;
		font-weight: 400;
	}
</style>
