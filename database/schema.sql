CREATE TABLE "public.users" (
	"userId" serial NOT NULL,
	"email" TEXT(255) NOT NULL UNIQUE,
	"hashedPassword" TEXT(255) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.product" (
	"productId" serial NOT NULL,
	"title" TEXT(255) NOT NULL,
	"description" TEXT(255) NOT NULL,
	"price" DECIMAL(10,2) NOT NULL,
	"imageUrl" TEXT(255) NOT NULL,
	"categoryId" int NOT NULL,
	CONSTRAINT "product_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.category" (
	"categoryId" serial NOT NULL,
	"name" TEXT(255) NOT NULL,
	CONSTRAINT "category_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.order" (
	"orderId" serial NOT NULL,
	"userId" serial,
	"orderDate" DATE NOT NULL,
	"totalAmount" DECIMAL(10,2) NOT NULL,
	CONSTRAINT "order_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.orderItem" (
	"orderItemId" serial NOT NULL,
	"orderId" int NOT NULL,
	"productId" int NOT NULL,
	"quantity" int NOT NULL,
	"price" DECIMAL NOT NULL,
	CONSTRAINT "orderItem_pk" PRIMARY KEY ("orderItemId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.cart" (
	"cartId" serial NOT NULL,
	"userId" int NOT NULL,
	CONSTRAINT "cart_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.cartItem" (
	"cartItemId" serial NOT NULL,
	"cartId" int NOT NULL,
	"productId" int NOT NULL,
	"quantity" int NOT NULL,
	CONSTRAINT "cartItem_pk" PRIMARY KEY ("cartItemId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "product" ADD CONSTRAINT "product_fk0" FOREIGN KEY ("categoryId") REFERENCES "category"("categoryId");


ALTER TABLE "order" ADD CONSTRAINT "order_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_fk0" FOREIGN KEY ("orderId") REFERENCES "order"("orderId");
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_fk1" FOREIGN KEY ("productId") REFERENCES "product"("productId");

ALTER TABLE "cart" ADD CONSTRAINT "cart_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_fk0" FOREIGN KEY ("cartId") REFERENCES "cart"("cartId");
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_fk1" FOREIGN KEY ("productId") REFERENCES "product"("productId");
