<template>
    <div class="baidu-map-wrapper">
        <div id="baidu-map" class="baidu-map-box"></div>
        <div v-clickoutside="closeResult">
            <el-input class="search-input" ref="searchInput" suffix-icon="el-icon-search" @focus="handleFocus" v-model="keywords" placeholder="搜商城"></el-input>
            <div class="address-result" v-if="isShowResult">
                <div class="address-item" v-for="(item, index) in addressResult" :key="index" @click="getPoint(item)">
                    <span class="el-icon-location" style="color: #D81E06; padding-right: 5px;"></span>
                    <div>
                        <span>{{item.title}}</span>
                        <span style="padding-left: 10px;">{{item.address}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BMap from 'BMap'
export default {
    data() {
        return {
            map: null,
            keywords: '',
            isShowResult: false,
            timer: null,
            addressResult: [],
        }
    },
    watch: {
        keywords(n) {
            if (n) {
                if (this.timer) {
                    clearTimeout(this.timer)
                    this.timer = null
                }else {
                    this.timer = setTimeout(_ => {
                        this.doSearch(n)
                        clearTimeout(this.timer)
                        this.timer = null
                    }, 300)
                }
            }
        }
    },

    methods: {
        doSearch(v) {
            let local = new BMap.LocalSearch(this.map, { renderOptions: { map: this.map, autoViewport: true } })
            local.search(v)
            local.setSearchCompleteCallback(res => {
                if (res.Uq) {
                    this.addressResult = res.Uq || []
                    this.isShowResult = true
                }else {
                    this.addressResult = []
                }
            })
        },
        closeResult() {
            this.isShowResult = false
            this.$refs.searchInput.blur()
        },
        handleFocus() {
            if (this.keywords && this.addressResult.length) {
                this.isShowResult = true
            }
        },
        getPoint(item) {
            this.map.clearOverlays()
            let new_point = new BMap.Point(item.point.lng, item.point.lat)
            let marker = new BMap.Marker(new_point)
            let opts = {
                width : 200,
                height: 90,
                title: item.title,
                enableMessage: true,
                message:""
            }
            let infoWindow = new BMap.InfoWindow(`地址：${item.address}`, opts)
            marker.addEventListener("click", () =>{          
                this.map.openInfoWindow(infoWindow, new_point)
            })
            this.map.addOverlay(marker)
            this.map.panTo(new_point)
            this.$emit('getPoints', item)
        }
    },
    mounted() {
        this.map = new BMap.Map("baidu-map")
        this.map.centerAndZoom(new BMap.Point(108.95346, 34.265725), 11)
        this.map.enableScrollWheelZoom()
    }
}
</script>

<style lang="scss" scoped>
.baidu-map-wrapper{
    position: relative;
    border-radius: 4px;
}
.search-input{
    position: absolute;
    z-index: 999;
    top: 10px;
    left: 10px;
    width: 400px;
}
.baidu-map-box{
    width: 100%;
    height: 400px;
    border-radius: 4px;
    /deep/ .BMap_bubble_title{
        color: #cc5522;
        font-weight: 600;
    }
    /deep/ .BMap_bubble_content{
        line-height: 24px;
        font-size: 13px;
    }
}
.address-result{
    position: absolute;
    z-index: 999;
    top: 50px;
    left: 10px;
    width: 400px;
    background-color: #fff;
    padding: 5px 10px;
    height: 340px;
    overflow-y: auto;
    .address-item{
        display: flex;
        align-items: baseline;
        padding: 8px;
        cursor: pointer;
        border-radius: 4px;
        line-height: 20px;
        &:hover{
            background-color: #eee;
        }
    } 
}
::-webkit-scrollbar{  
    width: 5px;  
    height: 5px;  
    background-color: #F5F5F5;  
}   
::-webkit-scrollbar-track{  
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  
    background-color: #F5F5F5;  
}    
::-webkit-scrollbar-thumb{  
    border-radius: 10px;  
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: #bdbdbd;  
}  
::-webkit-scrollbar-thumb:hover{
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.4);
}
</style>