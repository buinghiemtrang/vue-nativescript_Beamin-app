<template>
    <Page >
        <ActionBar>
            <GridLayout columns="auto,*" rows="auto">
			    <Label class="fas header__icon" :text="icon_back | fonticon" col="0" row="0" @tap="$navigateBack(App)"/>
			    <Label class="fas header__icon" col="1" row="0"/>
		    </GridLayout>
        </ActionBar>
        <FlexboxLayout class="page" backgroundColor="#ffff">
			<StackLayout class="form">
				<Image class="logo" src="https://images.glints.com/unsafe/180x0/glints-dashboard.s3.amazonaws.com/company-logo/ece9e898f6e0d9e04d8c2943d0e6f851.jpg" />
				<Label v-if="!isLoggingIn"  class="text-title" text="Đăng kí BEAMIN"/>
				<Label v-else class="text-title" text="Đăng nhập BEAMIN" />
				<StackLayout class="input-field" marginBottom="10">
					<!-- <TextField class="input" hint="Email" keyboardType="email" autocorrect="false"
                     autocapitalizationType="none" v-model="user1"
					 returnKeyType="next" @returnPress="focusPassword" fontSize="18" /> -->
                    <TextField class="input" hint="Tên" autocorrect="false" padding="15"
                        borderRadius="20" width="280" background="whitesmoke" autocapitalizationType="none" v-model="user1"
					    returnKeyType="next" @returnPress="focusPassword" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout class="input-field" marginBottom="10">
					<TextField ref="password" class="input" hint="Mật khẩu" secure="true" padding="15" background="whitesmoke"
                        borderRadius="20" width="280" v-model="pass" :returnKeyType="isLoggingIn ? 'done' : 'next'"
					    @returnPress="focusConfirmPassword" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout v-show="!isLoggingIn" class="input-field">
					<TextField  width="280" ref="confirmPassword" padding="15" class="input" 
                        hint="Nhập lại mật khẩu" secure="true" v-model="confirmPass" returnKeyType="done"
				        borderRadius="20" background="whitesmoke" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<Button width="180" color="white" borderRadius="20" marginTop="10"  
                    background="#81ecec" :text="isLoggingIn ? 'Đăng nhập':'Đăng ký'" 
                    @tap="submit(user1,pass,confirmPass)" class="btn m-t-20" />
                <Label marginLeft="55" v-show="isLoggingIn" text="Quên mật khẩu?" marginTop="3" class="login-label text-style"
                    @tap="forgotPassword(user1)"/>
			</StackLayout>

			<Label class="login-label sign-up-label" @tap="toggleForm" marginBottom="10">
                <FormattedString>
                    <Span :text="isLoggingIn ? 'Bạn chưa có tài khoản? ' : 'Trở về đăng nhập'" />
                    <Span :text="isLoggingIn ? 'Đăng ký' : ''" class="text-style" />
                </FormattedString>
	        </Label>
		</FlexboxLayout>
    </Page>
    
</template>

<script >
import App from './App'
export default {
    data() {
        return {
            icon_back: 'fa-arrow-left',
            isLoggingIn:true,
            user1:'',
            pass:'',
            confirmPass:'',
            users: this.$store.state.users
        }
    },
    methods: {
        submit(user,pass,confirmPass){
            if (this.isLoggingIn==true){
                var isLoggin = null
                for (var i = 0; i <this.users.length; i++) {
                    if(user.localeCompare(this.users[i].user) || pass.localeCompare(this.users[i].password)){
                        isLoggin = false
                    }
                    else{
                        isLoggin = true
                    }
                }
                if(isLoggin == true){
                    confirm({
                            title: "Thông báo",
                            message: "Đăng nhập thành công",
                            okButtonText: "Ok",
                        });
                        this.$store.commit('changeLoginAccount')
                        this.$store.commit('changeUser',user)
                        for (var i = 0; i < this.users.length; i++){
                            if (this.users[i].user == user){
                                this.$store.commit('changeAvatar',this.users[i].avatar)
                            }
                        }
                    this.$navigateTo(App,{
                    });    
                }
                else{
                    confirm({
                        title: "Thông báo",
                        message: "Sai tên tài khoản hoặc mật khẩu",
                        okButtonText: "Ok",
                        });
                }
            }
            else{
                if (user == '' || pass == '' || confirmPass == ''){
                    confirm({
                        title: "Thông báo",
                        message: "Vui lòng nhập đủ thông tin",
                        okButtonText: "Ok",
                    });
                }
                else{
                    if (pass != confirmPass){
                        confirm({
                            title: "Thông báo",
                            message: "Mật khẩu phải trùng khớp",
                            okButtonText: "Ok",
                        });
                    }
                    else{
                        var check = true
                        for (var i = 0; i <this.users.length; i++) {
                            if (user == this.users[i].user){
                                check = false
                                confirm({
                                    title: "Thông báo",
                                    message: "Tài khoản đã tồn tại",
                                    okButtonText: "Ok",
                                });
                            }
                        }
                        if(check ==true){
                            this.users.push({user : user,password : pass,conformPassWord : confirmPass})
                            confirm({
                                title: "Thông báo",
                                message: "Đăng ký thành công",
                                okButtonText: "Ok",
                            })
                            this.isLoggingIn = true
                        }
                    }
                }
            }
        },
        forgotPassword(name){
            if (name == ''){
            confirm({
                    title: "Thông báo",
                    message: "Nhập tài khoản để tìm mật khẩu",
                    okButtonText: "Ok",
                });
            }
            else{
                var found = null
                for(var i = 0; i <this.users.length; i++){
                    if (this.users[i].user==name){
                        found = true
                        
                    }
                    else{
                        found = false  
                    }
                }
                if (found == true){
                    for(var i = 0; i <this.users.length; i++){
                        if (this.users[i].user==name){
                            confirm({
                                title: "Thông báo",
                                message: "Mật khẩu của bạn là : "+ this.users[i].password,
                                okButtonText: "Ok",
                            });
                        }
                    } 
                }
                else{
                    confirm({
                            title: "Thông báo",
                            message: "Không tìm thấy tài khoản nào trùng khớp",
                            okButtonText: "Ok",
                    });
                }
            }
        },
        toggleForm() {
            this.isLoggingIn = !this.isLoggingIn;
        },
        focusPassword() {
            this.$refs.password.nativeView.focus();
        },
        focusConfirmPassword() {
            if (!this.isLoggingIn) {
                this.$refs.confirmPassword.nativeView.focus();
            }
        },
    },
};
</script>

<style scoped>
    ActionBar {
        text-align: left;
    }

    .text-title {
        text-align: center;
        font-weight: bold;
        color: #00cec9;
        font-size: 20px;
        margin: 20px;
    }

    .header__icon{
		font-size: 20px;
		margin-right: 20px;
		color: #000;
	}

    .logo{
        text-align: center;
        width: 100;
        height: 100;
        border-radius: 30px;
    }

    .page {
        align-items: center;
        flex-direction: column;
    }

    .form {
        margin-left: 10;
        margin-right: 10;
        flex-grow: 2;
        vertical-align: middle;
    }

    .text-style{
		text-decoration: underline;
	}
</style>