[1mdiff --git a/package.json b/package.json[m
[1mindex 71d35c7..6f3252d 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -26,11 +26,11 @@[m
     "core-js": "^2.5.4",[m
     "font-awesome": "^4.7.0",[m
     "hammerjs": "^2.0.8",[m
[31m-    "rxjs": "~6.2.0",[m
[32m+[m[32m    "rxjs": "^6.2.2",[m
     "zone.js": "~0.8.26"[m
   },[m
   "devDependencies": {[m
[31m-    "@angular-devkit/build-angular": "~0.8.0",[m
[32m+[m[32m    "@angular-devkit/build-angular": "^0.8.9",[m
     "@angular/cli": "~6.2.1",[m
     "@angular/compiler-cli": "^6.1.0",[m
     "@angular/language-service": "^6.1.0",[m
[1mdiff --git a/src/app/services/dish.service.ts b/src/app/services/dish.service.ts[m
[1mindex c632fc0..2fc2b39 100644[m
[1m--- a/src/app/services/dish.service.ts[m
[1m+++ b/src/app/services/dish.service.ts[m
[36m@@ -24,7 +24,7 @@[m [mgetFeaturedDish(): Observable<Dish> {[m
   return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));[m
 }[m
 [m
[31m-getDishIds(): Observable<string[] | any> {[m
[32m+[m[32mgetDishIds(): Observable<number[] | any> {[m
   return of(DISHES.map(dish => dish.id ));[m
 }[m
 [m
[1mdiff --git a/src/app/services/promotion.service.ts b/src/app/services/promotion.service.ts[m
[1mindex f9e645f..1ae198a 100644[m
[1m--- a/src/app/services/promotion.service.ts[m
[1m+++ b/src/app/services/promotion.service.ts[m
[36m@@ -22,3 +22,4 @@[m [mexport class PromotionService {[m
   getFeaturedPromotion(): Observable<Promotion> {[m
     return   of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));[m
 }[m
[32m+[m[32m}[m
