<template>
    <Page>
        <ActionBar>
            <GridLayout columns="auto,*" rows="auto">
                <Label class="fas header__icon" :text="icon_back | fonticon" col="0" row="0" @tap="$navigateBack(App)"/>
                <Label class="header__title" text="Chi tiết sản phẩm" col="1" row="0"/>
            </GridLayout>
        </ActionBar>
        <!-- info product -->
        <StackLayout>
			<ScrollView orientation="vertical">
				<GridLayout rows="*,*,*,*,*" background="#eeeeee">					
                    <Image row="0" :src="image" width="100%"/>
					<Label row="1" verticalAlignment="center" textAlignment="center" horizontalAlignment="center" :text="title"
                        color="#333" fontSize="25" fontWeight="bold" margin="3"/>
					<StackLayout  row="2" background="white" marginTop="8">
					<StackLayout orientation="horizontal">
						<Label text="Giá : " color="#000" margin="3" fontSize="14" horizontalAlignment="left"/>
						<Label :text="price | dollars" color="#333" fontSize="14" margin="3"/>
					</StackLayout>
						<Label v-if="inStore == 0" text="Hết hàng!" color="#fe2121" fontSize="18"
                            horizontalAlignment="left" margin="3"/>
						<Label v-if="inStore >  0" :text="'Số lượng còn: ' + inStore" color="#000"
							fontSize="14" horizontalAlignment="left" margin="3"/>
					</StackLayout>
					<StackLayout row="3" background="white" marginTop="8">
						<StackLayout  orientation="horizontal">
							<!-- v-if="item.quantityCart !== 0" -->
							<Label text="Chọn số lượng :" color="#000" fontSize="14"
								horizontalAlignment="left" margin="3" class="num" verticalAlignment="center"/>
							<Button class="hi" verticalAlignment="right" horizontalAlignment="right" margin="3" width="40"
								height="40" text="-" background="#81ecec" @tap="low(-1)" color="#fff"/>
                            <Label :text="quantity" verticalAlignment="center" horizontalAlignment="center" color="#000"/>
							<Button verticalAlignment="right" horizontalAlignment="right" margin="3" width="40"
								height="40" text="+" background="#81ecec" @tap="grow(1, inStore)" color="#fff"/>
						</StackLayout>
						<Button borderRadius="10%" verticalAlignment="center" horizontalAlignment="center" margin="3"
                            width="160" height="50" text="Thêm vào giỏ" background="#ee5253"
                            @tap="onBuy(image, title, price, quantity,inStore)" color="#fff"/>
					</StackLayout>
					<StackLayout row="4" marginTop="8"  background="white">
						<GridLayout padding="20" columns="220,100">
							<Label text="Bình luận" marginLeft="20" col="0" color="#fe2121" />
							<StackLayout col="1" orientation="horizontal" horizontalAlignment="left" textAlignment="left">
								<Image src="https://image.flaticon.com/icons/png/512/565/565620.png" width="12"/>
								<Label text="Sắp xếp :" fontSize="10" color="gray"/> 
								<Label text="Mới nhất" fontSize="10" color="#fe2121"/>
							</StackLayout>
						</GridLayout>
						<StackLayout>
							<GridLayout columns="60,220,50" rows="auto" padding="10" >
								<StackLayout col="0" horizontalAlignment="center" verticalAlignment="center">
									<Image v-if="avatar" :src="avatar" width="50"/>
									<Label v-if="user" :text="user +':'" col="0" row="0"  fontSize="15" textAlignment="center" horizontalAlignment="center"/>
								</StackLayout>
								<TextField col="1" row="0" class="input" hint="Bạn đang nghĩ gì ?"  v-model="text" height="40"
									borderRadius="10" background="whitesmoke" padding="10" width="80%" fontSize="10"/>
								<Button @tap="onComment(text)" text="Đăng" borderRadius="5" color="white" fontWeight="bold"
                                    fontSize="9" width="55" height="40" background="#81ecec" col="2"/>
							</GridLayout>
							<StackLayout v-for="i in comment" :key="i" orientation="horizontal" padding="15">
								<GridLayout orientation="horizontal" columns="60,210,60">
									<StackLayout col="0">
										<Image :src="i.avatar" height="55" width="50"/>
										<Label :text="i.user"  fontSize="13" textAlignment="center" horizontalAlignment="center"/>
									</StackLayout>
								<StackLayout col="1" padding="5">
									<StackLayout width="100%"  height="73" borderRadius="8" background="whitesmoke" padding="10">
										<Label :text="i.text" fontSize="13" />
									</StackLayout>
									<StackLayout orientation="horizontal" verticalAlignment="left">
										<Label @tap="onLike(i.text,i.user)" fontSize="13" fontWeight="bold" :text="'fa-thumbs-up' | fonticon" :class="[i.isLike == true ? 'fas active': 'fas']" />
										<Label fontSize="11" :text="i.like"/>
									</StackLayout>
								</StackLayout>
								<StackLayout col="2" horizontalAlignment="center" textAlignment="center" verticalAlignment="center">
									<Label v-if="i.date" :text="i.date" fontSize="8"/>
									<Label v-if="i.time" :text="'lúc : '+i.time" fontSize="8"/>
									<Button  @tap="deleteComment(i.text,i.user,user)" verticalAlignment="center"
										horizontalAlignment="center" textAlignment="center" text="Xóa" borderRadius="5" 
										color="white" fontWeight="bold" fontSize="8" width="40" height="30" background="#ee5253"/>
								</StackLayout>
								</GridLayout>
							</StackLayout>
						</StackLayout>
					</StackLayout>
				</GridLayout>
			</ScrollView>
      	</StackLayout>
    </Page>
</template>
<script>

export default {
    props: ["image","title", "price", "inStore"],
    data() {
        return {
            user: this.$store.state.user,
            icon_back: 'fa-arrow-left',
            quantity: 1,
            product: this.$store.state.product,
            comment : this.$store.state.comment,
            avatar : this.$store.state.avatar,
        }
    },
    methods:{
        low(value) {
            if (this.quantity > 1) {
                this.quantity += value;
            }
            else  {
                confirm({
                    title: "Thông báo",
                    message: "Số lượng không được nhỏ hơn 1 !",
                    okButtonText: "Ok",
                });
            } 
        },
        grow(value, inStore) {
            if (this.quantity < inStore) {
                this.quantity += value;
            }
            else {
                confirm({
                    title: "Thông báo",
                    message: "Hết hàng !",
                    okButtonText: "Ok",
                });
            }
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
        onLike(text,name){
            if (this.user == null){
                confirm({
                    title: "Thông báo",
                    message: "Bạn chưa đăng nhập",
                    okButtonText: "Ok",
                });
            }
            else{
                for (var i = 0; i < this.comment.length; i++){
                    if (this.comment[i].text == text || this.comment[i].user == name){
                        if (this.comment[i].isLike == false){
                            this.comment[i].isLike = true
                            this.comment[i].like +=1
                        }
                        else{
                            this.comment[i].isLike = false
                            this.comment[i].like -=1
                        } 
                    }
                } 
            }
        },
        deleteComment(text,name,user){
        if (user == "ly"){
            for (var i = 0; i < this.comment.length; i++){
                if (this.comment[i].text == text || this.comment[i].user == name){
                    this.comment.splice(i,1)
                }
            }
        }
        else{
            confirm({
                title: "Thông báo",
                message: "Bạn không đủ quyền",
                okButtonText: "Ok",
            });
        }
        },
        onComment(text){
            if (text==""){
                confirm({
                    title: "Thông báo",
                    message: "Hãy nhập bình luận",
                    okButtonText: "Ok",
                });
            }
            else{
                var today = new Date();
                var xDay = null;
                var date = today.getDate()+'-'+(today.getMonth()+1);
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                if (date){
                    if (today.getDate()==18 || today.getMonth()+1==7){
                        date = 'Hôm nay'
                    }
                else{
                        xDay = today.getDate()-18
                        date = xDay + 'ngày trước'
                    }
                    this.comment.unshift({text : text,avatar : this.avatar,user : this.user,like :1,isLike:false,time:time,date : date});
                }
                this.text = ""
            }
        },
    },
    filters: {
        dollars: (num) => `$${num / 100}`,
    },
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

    .header__icon{
		font-size: 20px;
	}
</style>
