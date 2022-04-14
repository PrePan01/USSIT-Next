<template>
  <n-config-provider
    :theme="darkTheme"
    style="height: 100%"
    :theme-overrides="themeOverrides"
  >
    <n-layout has-sider>
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="0"
        :width="240"
        show-trigger="bar"
        content-style="padding: 8px;"
        bordered
        default-collapsed="true"
      >
        <n-menu :options="menuOptions" />
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        <router-view></router-view>
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<script setup>
import flow_perception_hefei from "./views/flow_perception_hefei.vue";
import {
  NButton,
  NConfigProvider,
  NLayout,
  NLayoutContent,
  NLayoutSider,
  NMenu,
} from "naive-ui";
import { darkTheme } from "naive-ui";
import { RouterLink } from "vue-router";
import { h } from "vue";
// Theme Config
const themeOverrides = {
  DataTable: {
    thColor: "#202934FF",
    thColorHover: "#283B56FF",
    tdColorHover: "#283B56FF",
    tdColor: "#202934FF",
  },
};
const menuOptions = [
  {
    label: () =>
      h(
        "a",
        {
          class: "title",
          href: "/flow_1_1",
          rel: "noopenner noreferrer",
        },
        "城市群智感知验证系统"
      ),
    key: "/flow_1_1",
  },
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px'
      }
    }
  },
  {
    label: () =>
      h(
        "a",
        {
          href: "/flow_2",
          rel: "noopenner noreferrer",
        },
        "交通状况感知"
      ),
    key: "/flow_2",
    children: [
      {
        label: () =>
          h(
            "a",
            {
              href: "/flow_2_1",
              rel: "noopenner noreferrer",
            },
            "实时路况感知"
          ),
        key: "/flow_2_1",
      },
      {
        label: () =>
          h(
            "a",
            {
              href: "/flow_2_3",
              rel: "noopenner noreferrer",
            },
            "路口流量感知"
          ),
        key: "/flow_2_3",
      },
      {
        label: () =>
          h(
            "a",
            {
              href: "/flow_2_4",
              rel: "noopenner noreferrer",
            },
            "拥堵时空分析"
          ),
        key: "/flow_2_4",
      },
    ],
  },
  {
    label: () =>
      h(
        "a",
        {
          href: "/flow_3",
          rel: "noopenner noreferrer",
        },
        "交通实时预测"
      ),
    key: "/flow_3",
    children: [
      {
        label: () =>
          h(
            "a",
            {
              href: "/flow_3_1",
              rel: "noopenner noreferrer",
            },
            "路口流量预测"
          ),
        key: "/flow_3_1",
      },
      {
        label: () =>
          h(
            "a",
            {
              href: "/flow_3_2",
              rel: "noopenner noreferrer",
            },
            "事故风险预测"
          ),
        key: "/flow_3_2",
      },
      {
        label: () =>
          h(
            "a",
            {
              href: "/flow_perception_hefei",
              rel: "noopenner noreferrer",
            },
            "路况预测"
          ),
        key: "/flow_perception_hefei",
      },
      {
        label: () =>
          h(
            "a",
            {
              href: "/flow_3_4",
              rel: "noopenner noreferrer",
            },
            "车辆轨迹预测"
          ),
        key: "/flow_3_4",
      },
      {
        label: () =>
          h(
            "a",
            {
              href: "/flow_3_5",
              rel: "noopenner noreferrer",
            },
            "公交流量预测"
          ),
        key: "/flow_3_5",
      },
    ]
  },
  {
    label: () =>
      h(
        "a",
        {
          href: "/flow_4_1",
          rel: "noopenner noreferrer",
        },
        "交通调控引导"
      ),
    key: "/flow_4_1",
    children: [
      {
        label: () =>
          h(
            "a",
            {
              href: "/flow_4_1",
              rel: "noopenner noreferrer",
            },
            "智慧停车引导"
          ),
        key: "/flow_4_1",
      },
    ]
  },
  {
    label: () =>
      h(
        "a",
        {
          href: "/park_nanshan",
          rel: "noopenner noreferrer",
        },
        "基础设施建设"
      ),
    key: "hear-the-wind-sing",
  },
];
</script>

<style>
.n-layout,
.n-layout-sider-scroll-container {
  width: 100%;
  height: 100%;
  background-color: #293441;
}
body {
  margin: 0px;
  padding: 0px;
}
.n-menu-item-content-header > a {
  font-size: 18px;
}
.n-layout-toggle-bar__top,
.n-layout-toggle-bar__bottom {
  background-color: #bbb !important;
}
.title {
  font-weight: bold;
  font-size: 16px !important;
}
</style>
