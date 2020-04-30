<template>
    <div class="money-input">
        <el-input v-model="formattedValue" @input="handleChange"></el-input>
    </div>
</template>

<script>

export default {
    props: {
        value: {
            required: true,
            type: [Number, String],
            default: 0
        },
    },

    data () {
        return {
            formattedValue: ''
        }
    },

    watch: {
        value: {
            immediate: true,
            handler (newValue, oldValue) {
                this.formattedValue = newValue
            }
        },
        formattedValue(n) {
            this.$emit('input', n)
        }
    },

    methods: {
        handleChange(v) {
            let _value = v.split('')
            if(!/^([0-9]|\.)*$/.test(v)){
                _value = _value.splice(0, _value.length - 1).join('')
            }else {
                _value = v
            }
            let _arr = _value.split('.'), _str = _arr[1] || '', _temp = ''
            if (_str.length > 2) {
                _temp = _str.substr(0, 2)
                _arr[1] = _temp
                this.formattedValue = _arr.join('.')
            }else {
                this.formattedValue = _value
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.money-input{
    display: inline-block;
    width: 100px;
    /deep/ .el-input{
        width: 100%;
    }
}
</style>
