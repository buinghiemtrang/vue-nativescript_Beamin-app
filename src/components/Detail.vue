<template>
    <Page>
        <ActionBar>
			<GridLayout columns="auto,auto,*,30" rows="auto">
				<Label class="fas header__icon" :text="icon_back | fonticon" col="0" row="0" @tap="$navigateBack(App)"/>
                <Label class="header__title" :text="title" col="1" row="0"/>
				<Label class="fas header__icon" :text="icon_map | fonticon" marginTop="3" marginLeft="5"  col="2" row="0" color="#81ecec"/>
				<Label class="far header__icon" :text="icon_heart | fonticon" marginTop="3" col="3" row="0"/>
			</GridLayout>
        </ActionBar>
        <GridLayout orientation="vertical" width="100%" height="100%" columns="*" rows="*,auto">
            <ScrollView>
                <StackLayout col="0" row="0">
                    <StackLayout  backgroundColor="#48dbfb" paddingBottom="15" marginTop="-10" class="title-store"> 
                        <GridLayout columns="*,auto,auto,auto,*" rows="auto,auto,auto">
                            <!-- <Label class="far" :text="`Đối tác của BEAMIN ${icon_heart | fonticon}`"
                                fontWeight="300" col="2" row="0" color="#FFFFFF" padding="15" fontSize="17"/> -->
                            <Label text="Đối tác của BEAMIN" fontWeight="400" 
                                col="2" row="0" color="#FFFFFF" paddingBottom="15" paddingTop="15"  fontSize="17"/>
                            <Label class="fas" :text="icon_check | fonticon" marginTop="3" fontSize="17" color="#2c3e50"
                                marginLeft="10" paddingTop="15" col="3" row="0" />
                        </GridLayout>
                    </StackLayout>
                    <StackLayout marginTop="-20"
                        backgroundImage="~/assets/images/banner-1.jpg" height="180" width="90%" stretch="aspectFit"
                        class="img-store">
                    </StackLayout>
                    <!-- info and vocher -->
                    <GridLayout columns="auto" rows="30,30,30, 30" marginTop="5" >
                        <!-- info -->
                        <StackLayout col="0" row="0" >
                            <GridLayout columns="20, 80, 20, 40, 50,auto" rows="auto" marginLeft="10" >
                                <Label col="0" row="0" class="fas" :text="icon_star | fonticon" color="#FFC312"/>
                                <Label col="1" row="0" :text="rate_star"/>
                                <Label col="2" row="0" class="fas" :text="icon_cart | fonticon" marginTop="2"/>
                                <Label col="3" row="0" text="999+"/>
                                <Label col="5" row="0" class="text-style" text="Xem 300+ nhận xét" marginRight="15" 
                                    fontWeight="bold" color="#81ecec"/>
                            </GridLayout>
                        </StackLayout>
                        <!-- vocher -->
                        <Label col="0" row="1" text="--------------------------------------------------------------------------------"
                            marginLeft="20"/>
                        <StackLayout col="0" row="2">
                            <GridLayout columns="auto, auto,55,auto" rows="auto" marginLeft="10">
                                <Image col="0" row="0" src="~/assets/images/icon-sale2.png" width="27" marginBottom="10"/>
                                <Label text="Giảm 25k phí giao hàng" col="1" row="0" fontWeight="bold" paddingLeft="10"
                                    fontSize="16" color="#f1c40f"/>
                                <Label col="3" row="0" class="text-style" text="Xem thêm" fontWeight="bold" color="#81ecec" marginRight="15"/>  
                            </GridLayout>
                        </StackLayout>
                        <Label col="0" row="3" text="--------------------------------------------------------------------------------"
                            marginLeft="20"/> 
                    </GridLayout>
                    <!-- hot items -->
                    <GridLayout columns="auto,auto" rows="auto" marginTop="5">
                        <Label text="Hot Item" col="0" row="0" fontWeight="bold"
                            paddingLeft="10" fontSize="19" color="#000"/>
                        <Image marginLeft="3" col="1" row="0" src="~/assets/images/icon-hot.png" width="30"/>
                    </GridLayout>
                    <ScrollView orientation="horizontal">
                        <StackLayout orientation="horizontal">
                            <StackLayout margin="10" v-for="item in hotItem" :key="item">
                                <Image class="img-thumb" :src="item.img" marginLeft="20"
                                    height="120" width="80%" @tap="showAllProduct()"/>
                                <Label :text="item.name" marginLeft="10" fontSize="14" color="#333" marginTop="10"/>
                                <Label :text="item.price | dollars" marginLeft="10" fontSize="13" fontWeight="bold" color="#000000"/>
                            </StackLayout>
                        </StackLayout>
                    </ScrollView>
                    <Label text="________________________________________________"
				 	marginLeft="20" color="#b2bec3"/>
                    <!-- product food -->
                    <GridLayout columns="auto,auto,*,auto" rows="auto" marginTop="10">
                        <Label text="Món ăn" col="0" row="0" fontWeight="bold"
                            paddingLeft="10" fontSize="19" color="#000"/>
                        <Image col="1" row="0" src="~/assets/images/icon-product.png" width="25" marginLeft="5"/>
                        <Label col="3" row="0" class="text-style" text="Xem thêm" fontWeight="bold" color="#81ecec" 
                            marginRight="20" @tap="showAllProduct()"/>
                    </GridLayout>
                    <ScrollView orientation="horizontal">
                        <StackLayout orientation="horizontal">
                            <StackLayout margin="10" v-for="item in Food" :key="item">
                                <Image class="img-thumb" :src="item.image" marginLeft="20"
                                    height="120" width="80%" @tap="showAllProduct()"/>
                                <Label :text="item.name" marginLeft="10" fontSize="14" color="#333" marginTop="10"/>
                                <Label :text="item.price | dollars" marginLeft="10" fontSize="13" fontWeight="bold" color="#000000"/>
                            </StackLayout>
                        </StackLayout>
                    </ScrollView>
                    <!-- product drink -->
                    <GridLayout columns="auto,auto,*,auto" rows="auto" marginTop="10">
                        <Label text="Đồ uống" col="0" row="0" fontWeight="bold"
                            paddingLeft="10" fontSize="19" color="#000"/>
                        <Image col="1" row="0" src="~/assets/images/icon-product2.png" width="25" marginLeft="5"/>
                        <Label col="3" row="0" class="text-style" text="Xem thêm" fontWeight="bold" color="#81ecec" 
                            marginRight="20" @tap="showAllProduct()"/>
                    </GridLayout>
                    <ScrollView orientation="horizontal">
                        <StackLayout orientation="horizontal">
                            <StackLayout margin="10" v-for="item in Drink" :key="item">
                                <Image class="img-thumb" :src="item.image" marginLeft="20"
                                    height="120" width="80%" @tap="showAllProduct()"/>
                                <Label :text="item.name" marginLeft="10" fontSize="14" color="#333" marginTop="10"/>
                                <Label :text="item.price | dollars" marginLeft="10" fontSize="13" fontWeight="bold" color="#000000"/>
                            </StackLayout>
                        </StackLayout>
                    </ScrollView>
                    <!--  -->
                </StackLayout>
            </ScrollView>
        </GridLayout>
    </Page>
</template>

<script>
import AllProduct from './AllProduct.vue'
    export default{
        props: ["title", "name", "rate_star", "far"],
        data(){
            return {
                icon_back: 'fa-arrow-left',
                icon_map: "fa-map-marker-alt",
                // icon_search: "fa-search",
                icon_heart: "fa-heart",
                icon_check: "fa-check-circle",
                icon_star: "fa-star",
                icon_cart: "fa-shopping-basket",
                hotItem: [
                    {
                        img: "https://cf.shopee.vn/file/a582064110e86a0b25bd9d716b60102a",
                        name: "Pepsi BlackPink Black",
                        price: 120
                    },
                    {
                        img: "https://cf.shopee.vn/file/ed7509e86fc53c58441261d228077ff5",
                        name: "Pepsi BlackPink Blue",
                        price: 120
                    },
                    {
                        img: "https://cf.shopee.vn/file/2ef8edd81c688a07d74f37196eb66621",
                        name: "Mì 3 Miền Gold",
                        price: 300
                    },
                    {
                        img: "https://cf.shopee.vn/file/a80c5b29f626875ad719f8ea8014a22b",
                        name: "Trà Sữa Trân Châu",
                        price: 130
                    },
                ],
                Drink: [
                    {
                        image: "https://cf.shopee.vn/file/adef11d2abad3337961ba397a2e08b14",
                        name: "Pepsi BlackPink",
                        price: 120,
                    },
                    {
                        image: "https://cf.shopee.vn/file/058c8e631ce9a6b62f732ca746da905d",
                        name: "BIA BUDWEISER",
                        price: 150,
                    },
                    {
                        image: "https://cf.shopee.vn/file/a80c5b29f626875ad719f8ea8014a22b",
                        name: "Trà Sữa Trân Châu",
                        price: 250,
                    },
                    {
                        image: "https://cf.shopee.vn/file/508e70c6b9010431f6e40e431e3f7597",
                        name: "Cà Phê Phố",
                        price: 380,
                    },
                    {
                        image: "https://cf.shopee.vn/file/f952c36aae5bf8ef7deb6b22f6bf72b8",
                        name: "Bia StrongBow",
                        price: 230,
                    },
                ],
                Food: [
                    
                    {
                        image: "https://cf.shopee.vn/file/ccf6fe6db188d39f6f5c54ff6ceabf1f",
                        name: "Mì Hảo Hảo",
                        price: 400,
                    },
                    {
                        image: "https://cf.shopee.vn/file/d64672d9562cc04791ff84ac624f7aa1",
                        name: "Bánh Mì Nhân Đậu Đỏ",
                        price: 600,
                    },
                    {
                        image: "https://cf.shopee.vn/file/ccf6fe6db188d39f6f5c54ff6ceabf1f",
                        name: "Mì Hảo Hảo",
                        price: 400,
                    },
                    {
                        image: "https://cf.shopee.vn/file/138f51c12482ff55236594f33f45e2e9",
                        name: "Mì Omachi bò hầm",
                        price: 160,
                    },
                ]
            }
        },
        filters: {
            dollars: (num) => `$${num / 100}`,
        },
        
        methods: {
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
            
        }
    }
</script>

<style scoped>
    .header__title{
		font-weight: 500;
		font-size: 20px;
		color: #222;
        padding-left: 20px;
	}

	.header__icon{
		font-size: 18px;
	}

    .text-style{
		text-decoration: underline;
	}
    
    .title-store{
        text-align: center;
    }

    .img-store{
        border-radius: 10px;
        background-repeat: no-repeat;
    	background-size: cover;
    	background-position: center;
    }

    .img-thumb{
		border-radius: 10%;
	}

    .card {
        background-color: #fff;
        color: #4d4d4d;
        margin: 15;
    }

    .card-layout {
        padding: 20;
    }
</style>