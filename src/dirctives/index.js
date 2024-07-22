import Vue from "vue";
import router from "@/router";

Vue.directive("permission", {
  inserted(el, binding) {
    let { action } = binding.value;
    let permission = router.currentRoute.meta.operatePermission.find(
      (e) => action === e.key
    );
    if (!permission) {
      el.style.display = "none";
    }
  },
});
