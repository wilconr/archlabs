$(document).ready((function(){var e=$(".hamburger"),s=$(".sidebar-overlay"),o=!1;e.click((function(){1==o?(s.hide(),e.removeClass("is-open"),e.addClass("is-closed"),o=!1):(s.show(),e.removeClass("is-closed"),e.addClass("is-open"),o=!0)})),$('[data-toggle="offcanvas"]').click((function(){$("body").toggleClass("menu-toggled"),$("html").toggleClass("hidden-fixed"),$(".sidebar-sub").removeClass("open")}))}));