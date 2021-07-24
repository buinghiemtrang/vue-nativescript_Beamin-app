<template>
    <Page>
        <ActionBar>
            <GridLayout columns="auto,*" rows="auto">
			    <Label class="fas header__icon" :text="icon_back | fonticon" col="0" row="0" @tap="$navigateBack(App)"/>
                <Label class="header__title" text="Giỏ hàng của bạn" col="1" row="0"/>
		    </GridLayout>
        </ActionBar>
        <GridLayout orientation="vertical" height="100%" width="100%" columns="*" rows="*,auto">
            <ScrollView>
                <StackLayout col="0" row="0">
                    <!-- list product in cart -->
                    <Label textAlignment="center" color="#000" fontSize="20" fontWeight="400" v-if="product.length == 0" text="CHƯA CÓ SẢN PHẨM NÀO"/>
                    <ListView  class="list-group" v-for="item in product" :key="item">
                        <v-template>
                            <GridLayout columns="auto,240" rows="auto" >
                                <Image class="img-product" height="110" width="110" :src="item.imgsrc" col="0" row="0"/>
                                <Stacklayout marginTop="20" col="1" row="1">
                                    <Label class="title-item" :text="item.title" color="#333" fontSize="16" marginLeft="10"/>
                                    <Label color="#111" fontSize="14" marginLeft="10" fontWeight="bold" :text=" item.price * item.quantity | dollars"/>
                                    <GridLayout columns="auto,*,auto,auto" row="auto,auto">
                                            <!-- minus -->
                                            <Button verticalAlignment="right" horizontalAlignment="right" margin="3" col="0" fontWeight="bold"
                                                width="40" height="40" fontSize="15" text="-"  backgroundColor="#81ecec" @tap="low(item)"/>
                                            <!-- quantity -->
                                            <Label :text="'Số lượng: ' + item.quantity" verticalAlignment="center" horizontalAlignment="center" col="1"/>
                                            <!-- plus -->
                                            <Button verticalAlignment="right" horizontalAlignment="right" margin="3" width="40" height="40" 
                                                fontSize="15" fontWeight="bold" text="+"  backgroundColor="#81ecec" @tap="grow(item)" col="2"/>
                                            <!-- Delete -->
                                            <Button verticalAlignment="right" horizontalAlignment="right" margin="3" width="70" height="50"
                                                :text="icon_delete | fonticon" col="3" class="far" color="#fff" backgroundColor='#ee5253' @tap="remove(item.title)"/>    
                                    </GridLayout>
                                </Stacklayout>
                            </GridLayout>
                        </v-template>
                    </ListView>
                </StackLayout>
            </ScrollView>
            <!-- chech out  -->
            <StackLayout col="0" row="1" orientation="horizontal" height="80"  backgroundColor="#dfe6e9">
                <GridLayout v-if="product.length != 0" rows="*" columns="150,auto,*">
                    <Label col="0" row="0" :text="'Tổng tiền : '" marginLeft="10" marginTop="30" fontWeight="bold"/>
                    <Label col="1" row="0" :text=" total  | dollars"   marginTop="30" fontWeight="bold"/>
                    <Button col="2" row="0" text="Thanh Toán" backgroundColor="#00cec9" margin="10" @tap="showModal()"/>
                </GridLayout>
            </StackLayout>
        </GridLayout>
        
    </Page>
</template>

<script>
import Modal from './ModalCheckout.vue'
export default {
    data() {
        return{
            icon_back: 'fa-arrow-left',
            icon_delete: "fa-trash-alt",
            product: this.$store.state.product
        }
    },
    methods : {
        low(item){
            var name = item.title
            if (item.quantity > 1){
                for (var i = 0; i < this.product.length; i++) {
			        if (this.product[i].title === name) {
				        this.product[i].quantity -= 1;
			        }
		        }               
            }
            else  {
                confirm({
                    title: "Thông báo",
                    message: "Số lượng không được nhỏ hơn 1 !",
                    okButtonText: "Ok",
                });
            } 
        },
        grow(item){
                 var name = item.title
            if (item.quantity < item.inStore){
                for (var i = 0; i < this.product.length; i++) {
                    if (this.product[i].title === name) {
                        this.product[i].quantity += 1;
                    }
		        }
            }
            else{
                confirm({
                    title: "Thông báo",
                    message: "Hết hàng !",
                    okButtonText: "Ok",
                });
            }
        },
        remove(name){
            this.$store.commit('delete',name)
        },
        showModal() {
            this.$showModal(Modal,{
                props : {
                name : this.user
            },
            // animated: true,
            // transition: {
            //     name: "slideLeft",
            //     duration: 250,
            //     curve: "easeIn",
            // },
        }).then((data) => {
                this.$store.commit("deleteAll");     
                this.$refs.listView.refresh();
            })
        },
    },

    computed:{
        total(){
            var tongtien = 0;
            for(var i = 0; i < this.product.length; i++) {
                tongtien += this.product[i].quantity * this.product[i].price;
            }
        return tongtien;
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

    .list-group{
        height: 2000px;
    }

    .img-product{
		border-radius: 10px;
		padding: 20px;
	}

</style>
