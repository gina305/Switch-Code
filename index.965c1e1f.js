(function() {
    function a() {
        document.querySelector("html").classList.contains("is-builder") || (document.querySelectorAll(".mbr-gallery-item").forEach(function(a) {
            a.addEventListener("click", function(a) {
                "" !== this.getAttribute("data-target") && (document.querySelector("#" + this.getAttribute("data-target").replace("#", "")).modal("show"), document.querySelector("#" + this.getAttribute("data-target").replace("#", "")).modal("show"));
            });
        }), setTimeout(function() {
            document.querySelector(".mbr-popup .modal-content *").classList.remove("hidden");
            document.querySelector(".mbr-popup .modal-content *").classList.remove("animate__animated");
            document.querySelector(".mbr-popup .modal-content *").classList.remove("animate__delay-1s");
            document.querySelector(".mbr-popup .modal-content *").classList.remove("animate__fadeInUp");
        }, 0));
    }
    "complete" === document.readyState || "interactive" === document.readyState ? a() : document.addEventListener("DOMContentLoaded", function() {
        a();
    });
})();

//# sourceMappingURL=index.965c1e1f.js.map
