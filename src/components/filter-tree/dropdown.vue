<template>
    <div
        class="drop-down el-select-dropdown el-popper"
        :style="{'width' : $parent.width + 'px'}"
    >
        <el-tree
            class="filter-tree"
            :data="data"
            node-key="id"
            :props="defaultProps"
            :show-checkbox="showCheckbox"
            ref="filterTree"
            :filter-node-method="filterNode"
            @check-change="handleCheckChange"
            @node-click="treeNodeClick"
        >
        </el-tree>
    </div>
</template>

<script>
import Popper from "element-ui/src/utils/vue-popper";
export default {
  name: "dropDownList",
  componentName: "dropDownList",
  mixins: [Popper],
  props: {
    data: { type: Array, default: () => [] },
    placement: { default: "bottom-start" },
    boundariesPadding: { default: 0 },
    popperOptions: {
      default() {
        return {
          gpuAcceleration: false
        };
      }
    },
    visibleArrow: { default: true },
    appendToBody: { type: Boolean, default: true },
    defaultProps: {
      default() {
        return {
          children: "children",
          label: "label"
        };
      }
    },
    showCheckbox: { type: Boolean, default: false }
  },

  data() {
    return {
      beforeLable: [],
      beforeIds: []
    };
  },

  methods: {
    handleCheckChange(data, checked, indeterminate) {
      let allChecked = this.$refs.filterTree.getCheckedNodes();
      let labelName = [],
        value = [];
      allChecked.forEach(item => {
        if (item.level == 3) {
          labelName.push(item.label);
          value.push(item.id);
        }
      });
      this.$emit("checkChange", labelName, value);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleFilter(val) {
      this.$refs.filterTree.filter(val);
    },
    treeNodeClick(data, node, el) {
      if (node.level > 2) {
        this.beforeLable = [];
        this.beforeIds = [];
        this.getBeforeTreeNode(node);
        this.$emit("selectChange", this.beforeLable, this.beforeIds);
      }
    },
    getBeforeTreeNode(node) {
      if (node.level == 0) {
        return;
      } else {
        this.beforeLable.unshift(node.data.label);
        this.beforeIds.unshift(node.data.id);
        return this.getBeforeTreeNode(node.parent);
      }
    }
  },

  mounted() {
    this.referenceElm = this.$parent.$refs.reference.$el;
    this.$parent.popperElm = this.popperElm = this.$el;
    this.$on("updatePopper", () => {
      if (this.$parent.visible) this.updatePopper();
    });
    this.$on("destroyPopper", this.destroyPopper);
  }
};
</script>

<style lang="scss" scoped>
.drop-down {
  min-height: 200px;
  max-height: 400px;
  overflow: auto;
  padding: 10px 5px;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #bdbdbd;
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.4);
}
</style>


