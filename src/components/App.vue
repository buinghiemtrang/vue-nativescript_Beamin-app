<template>
    <Page>
		<ActionBar>
			<GridLayout columns="auto,*,60,30" rows="auto">
				<Label class="fas header__icon map" :text="icon_map | fonticon" col="0" row="0"/>
				<Label class="header__title" text="Tp. Hồ Chí Minh" col="1" row="0"/>
				<Label class="header__user" :text="user"  marginTop="2" col="2" row="0"/>
				<Label class="fas header__icon" :text="icon_user | fonticon"
					marginTop="3" col="3" row="0" @tap="showLogin()"/>
			</GridLayout>
        </ActionBar>
		<!-- Giao diện -->
		<GridLayout orientation="vertical" width="100%" height="100%" columns="*" rows="*,auto">
			<ScrollView>
			<StackLayout col="0" row="0">
			<!-- <SearchBar class=" header__search" hint="Tìm nhà hàng món ăn"  textFieldHintColor="whitesmoke"></SearchBar> -->
				<TextField class="fas header__search" hint=" Tìm cửa hàng nhà hàng ! "/> <!-- icon_search | fonticon -->
				<Label text="________________________________________________"
				 	marginLeft="20" color="#b2bec3"/>
				<!-- Images Banner Scroll -->
				<ScrollView orientation="horizontal">
					<StackLayout orientation="horizontal">
						<StackLayout margin="10" v-for="item in listImgBanner" :key="item">
							<Image class="banner-img" :src="item.imgUrl"  paddingLeft="20" paddingRight="20" paddingTop="20" paddingBotton="5"
								height="170" width="80%" stretch="aspectFit"/>
						</StackLayout>
					</StackLayout>
				</ScrollView>
				<!-- Icon banner food -->
				<GridLayout columns="auto,*,auto,auto" rows="auto" marginTop="10">
                    <Label text="Food and Drink" col="0" row="0" fontWeight="bold"
						paddingLeft="10" fontSize="19" color="#000000"/>
                    <Label class="text-style" text="Xem Ngay " col="2" marginTop="5"
						row="0" fontSize="16" color="#81ecec" @tap="showAllProduct()" />
                    <Label class="far" :text="icon_next | fonticon" col="3" row="0" 
						color="#81ecec" marginTop="7" fontSize="17" marginRight="20" @tap="showAllProduct()"/>
                </GridLayout>
				<GridLayout class="icon-food" columns="*,*,*,*" rows="100" orientation="horizontal"
					paddingLeft="20" paddingRight="20" marginLeft="20">
					<StackLayout col="0" rows="0"   orientation="horizontal">
						<Image class="icon-img" src="~/assets/images/icon-food1.png" />
					</StackLayout>
					<StackLayout col="1" rows="0"   orientation="horizontal">
						<Image class="icon-img" src="~/assets/images/icon-food2.png" />
					</StackLayout>
					<StackLayout col="2" rows="0"   orientation="horizontal">
						<Image class="icon-img" src="~/assets/images/icon-food3.png" />
					</StackLayout>
					<StackLayout col="3" rows="0"   orientation="horizontal">
						<Image class="icon-img" src="~/assets/images/icon-food4.png" />
					</StackLayout>
				</GridLayout>
				<Label text="-----------------------------------------------------------------------"
				 	marginLeft="30"/>
				<!-- Icon banner drink -->
				<GridLayout class="icon-drink" columns="*,*,*,*" rows="100" orientation="horizontal"
					paddingLeft="20" paddingRight="20" marginLeft="20">
					<StackLayout col="0" rows="1"   orientation="horizontal">
						<Image class="icon-img" src="~/assets/images/icon-drink1.png" />
					</StackLayout>
					<StackLayout col="1" rows="1"   orientation="horizontal">
						<Image class="icon-img" src="~/assets/images/icon-drink2.png" />
					</StackLayout>
					<StackLayout col="2" rows="1"   orientation="horizontal">
						<Image class="icon-img" src="~/assets/images/icon-drink3.png" />
					</StackLayout>
					<StackLayout col="3" rows="1"   orientation="horizontal">
						<Image class="icon-img" src="~/assets/images/icon-drink4.png" />
					</StackLayout>
				</GridLayout>
				<!-- phan Vocher cua ban -->
				<GridLayout columns="auto,auto" rows="auto" marginTop="10" marginLeft="10">
					<Image col="0" row="0" src="~/assets/images/icon-sale.png" width="30"/>
                    <Label text="Bạn ơi, rất nhiều Vocher đang đợi bạn !" col="1" row="0" fontWeight="bold" paddingLeft="10"
					fontSize="16" color="#81ecec"/>
                </GridLayout>
				<ScrollView orientation="horizontal">
					<StackLayout orientation="horizontal">
						<StackLayout margin="10" v-for="item in imgThumb" :key="item">
							<Image class="img-thumb" :src="item.image"  paddingLeft="20" paddingRight="20" paddingTop="20"
								height="120" width="80%" />
						</StackLayout>
					</StackLayout>
				</ScrollView>
				<!-- cac cua hang gan day -->
				<GridLayout columns="auto,auto" rows="auto" marginTop="20">
                    <Label text="Quanh đây có gì ngon không " col="0" row="0" fontWeight="bold" paddingRigth="20" paddingLeft="10" fontSize="19" color="#000000"/>
					<Image col="1" row="0" src="~/assets/images/icon-food.png" width="30"/>
                </GridLayout>
				<ListView  class="list-group" v-for="item in listStores" :key="item">
					<v-template>
						<GridLayout columns="auto,*" rows="auto" class="fa group-item" @tap="showDetail(item)">
							<Image class="img-item" height="125" width="125" :src="item.image" col="0" row="0" />
							<Stacklayout marginTop="20" col="1" row="0">
								<GridLayout columns="auto,auto" row="auto">
									<Label col="0" row="0" class="fas" :text="icon_check | fonticon" color="#3498db" fontSize="16" paddingTop="3"/>
									<Label col="1" row="0" class="title-item" :text="item.title" />
								</GridLayout>
								<GridLayout columns="auto,auto" row="auto">
									<Label marginTop="2" col="0" row="0" :text="item.name" fontSize="14px" color="#444"/>
									<Image marginLeft="5" col="1" row="0" src="~/assets/images/icon-store.png" width="20"/>
								</GridLayout>
								<GridLayout columns="20,80,auto" row="0" marginTop="25">
									<Label color="#FFC312" col="0" row="0" class="fas" :text="icon_star | fonticon "/>
									<Label col="1" row="0" :text="item.rate_star"/>
									<Label col="2" row="0" :text="item.far"/>
								</GridLayout>
							</Stacklayout>
						</GridLayout>
					</v-template>
				</ListView>
			</StackLayout>
			</ScrollView>
		</GridLayout>
    </Page>
</template>

<script >
import Detail from './Detail.vue'
import AllProduct from './AllProduct.vue'
import Login  from './Login.vue'
	export default {
		data() {
			return {
				icon_map: "fa-map-marker-alt",
				icon_email: "fa-envelope",
				icon_user: "fa-user-graduate",
				icon_search: "fa-search",
				icon_next: "fa-hand-point-right",
				icon_check: "fa-check-circle",
				icon_star: "fa-star",
				user: this.$store.state.user,
				listImgBanner: [
					{
						imgUrl: "~/assets/images/banner-3.jpg",
					},
					{
						imgUrl: "~/assets/images/banner-5.jpg",
					},
					{
						imgUrl: "~/assets/images/banner-2.jpg",
					},
					{
						imgUrl: "~/assets/images/banner-4.jpg",
					},
					{
						imgUrl: "~/assets/images/banner-1.jpg",
					},
				],
				listIconFood: [
					{
						imgIcon: "~/assets/images/icon-food1.png",
					},
					{
						imgIcon: "~/assets/images/icon-food2.png",
					},
					{
						imgIcon: "~/assets/images/icon-food3.png",
					},
					{
						imgIcon: "~/assets/images/icon-food4.png",
					}
				],
				listIconDrink: [
					{
						imgIcon: "~/assets/images/icon-drink1.png",
						name: "Bia"
					},
					{
						imgIcon: "~/assets/images/icon-drink2.png",
						name: "Nước Trái Cây"
					},
					{
						imgIcon: "~/assets/images/icon-drink3.png",
						name: "Đồ Uống"
					},
					{
						imgIcon: "~/assets/images/icon-drink4.png",
						name: "Đồ Ăn Nhanh"
					},
				],
				imgThumb: [
					{image: "~/assets/images/img-thumb5.jpg"},
					{image: "~/assets/images/img-thumb4.jpg"},
					{image: "~/assets/images/img-thumb7.jpg"},
					{image: "~/assets/images/img-thumb2.jpg"},
					{image: "~/assets/images/img-thumb3.jpg"},
					{image: "~/assets/images/img-thumb6.jpg"},
					{image: "~/assets/images/img-thumb1.jpg"},
				],
				listStores: [
					{
						image: "~/assets/images/logo5.jpg",
						title: " VinMart - Âu Cơ",
						name: "Cửa hàng tiện lợi",
						rate_star: "4.5 (500+)",
						far: "0.5 km"
					},
					{
						image: "~/assets/images/logo2.jpg",
						title: "Coop Food - S40 - Vườn Lài",
						name: "Cửa hàng tiện lợi",
						rate_star: "4.1 (900+)",
						far: " 1.0 km"
					},
					{
						image: "~/assets/images/logo4.jpg",
						title: " Ministore - S48 - Tân Qúy",
						name: "Cửa hàng tiện lợi",
						rate_star: "4.3 (400+)",
						far: " 2.4 km"
					},
					{
						image: "~/assets/images/logo3.jpg",
						title: "VINAMILK - Lạc Long Quân",
						name: "Cửa hàng tiện lợi",
						rate_star: "4.6 (900+)",
						far: " 4.0 km"
					},
					{
						image: "~/assets/images/logo1.jpg",
						title: "Eco Market - Đồng Đen",
						name: "Cửa hàng tiện lợi",
						rate_star: "4.7 (800+)",
						far: "1.7 km"
					},
					{
						image: "~/assets/images/logo6.jpg",
						title: "TH true Milk Miền Đông",
						name: "Cửa hàng tiện lợi",
						rate_star: "4.8 (700+)",
						far: "2.4 km"
					},
					{
						image: "~/assets/images/logo8.png",
						title: "7 Eleven Trường Chinh",
						name: "Cửa hàng tiện lợi",
						rate_star: "4.9 (600+)",
						far: "3.0 km"
					},
					{
						image: "~/assets/images/logo7.jpg",
						title: "LOOTE MARK Phú Thạnh",
						name: "Cửa hàng tiện lợi",
						rate_star: "4.5 (800+)",
						far: "0.3 km"
					},
					{
						image: "~/assets/images/logo9.png",
						title: "GS25 Âu Cơ",
						name: "Cửa hàng tiện lợi",
						rate_star: "4.4 (900+)",
						far: "2.2 km"
					},
				]
			}
		},
		methods: {
			showDetail(item){
				this.$navigateTo(Detail,{
					props:{
						// image: item.image,
						title: item.title,
						name: item.name,
						rate_star: item.rate_star,
						far: item.far,
					},
					animated: true,
					transition: {
						name: "slideLeft",
						duration: 250,
						curve: "easeIn",
					},
				});
			},
			showAllProduct() {
                this.$navigateTo(AllProduct, {
                    animated: true,
                    transition: {
                    	name: "slideLeft",
                    	duration: 250,
                    	curve: "easeIn",
                    },
                });
            },
			showLogin(){
				this.$navigateTo(Login, {
                    animated: true,
                    transition: {
                    	name: "slideLeft",
                    	duration: 250,
                    	curve: "easeIn",
                    },
                });
			}
		}
	}
</script>

<style scoped>
    ActionBar {
        background-color: #fff;
        color: #ffffff;
    }

	.header__title{
		font-weight: 700;
		font-size: 20px;
		color: #000;
	}

	.header__user{
		font-size: 18px;
		color: #e74c3c;
		font-weight: 500;
	}

	.header__icon{
		font-size: 20px;
		margin-right: 20px;
		color: #000;
	}

	.map{
		color: #81ecec;
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

	.banner-img{
		background-repeat: no-repeat;
    	background-size: cover;
    	background-position: center;
    	border-radius: 10px;
		margin-top: 10px;
		margin-left: 5px;
	}

	.icon-img{
		width: 60%;
	}
	.img-thumb{
		border-radius: 10%;
	}
	.text-style{
		text-decoration: underline;
	}

	.list-group{
		margin: 40px 0 50px 0;
		height: 1150;
	}

	.img-item{
		border-radius: 10px;
		padding: 25px;
	}

	.title-item{
		font-size: 16px;
		font-weight: 500;
		color: #000;
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 5px;

	}
</style>
