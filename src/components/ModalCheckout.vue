<template>
    <Page>
        <StackLayout class="" backgroundColor="white" width="300" height="300">
            <Label text="Nhập địa chỉ của bạn:" />
            <TextField v-model="address" hint="Location..." padding="10" width="80%" borderRadius="10" background="whitesmoke" />
            <Label text="Số điện thoại:" />
            <TextField v-model="sdt" hint="Number..." padding="10" width="80%" borderRadius="10" background="whitesmoke" />
            <Label text="Tên:" />
            <TextField v-model="name" hint="Name..." padding="10" width="80%" borderRadius="10" background="whitesmoke" />

            <Button
                class="btn btn-info"
                background="#fa4b4b"
                text="Xác nhận"
                fontWeight="bold"
                color="white"
                @tap="onConfirm"
                verticalAlignment="bottm"
                horizontalAlignment="bottom"
            />
            <Button
                class="btn btn-danger"
                background="gray"
                text="Hủy"
                fontWeight="bold"
                color="white"
                @tap="closeThisModel()"
                verticalAlignment="bottom"
                horizontalAlignment="bottom"
            />
        </StackLayout>
    </Page>
</template>
<script>

export default {
    props : ["name"],
    data() {
        return {
            address: "",
            sdt: "",
            name:""
    };
},
    methods: {
        onConfirm() {
            var data = null;
            if (this.address === "" || this.sdt === "" || this.name ==="") {
                confirm({
                    title: "Thông báo",
                    message: "Vui lòng điền đủ thông tin !",
                    okButtonText: "Ok",
                });
            data = false;
            } 
            else {
                data = true;
                this.$modal.close(data);
            }
        },
        closeThisModel() {
            var data = false;
            this.$modal.close(data);
        },
    },
};
</script>

<style scoped>

</style>