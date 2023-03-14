set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."categories" (
	"categoryId" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."products" (
	"productId" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"imageUrl" varchar(255) NOT NULL,
	"price" DECIMAL(10,2) NOT NULL,
	"categoryId" int NOT NULL,
	CONSTRAINT "products_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."orderItem" (
	"orderItemId" serial NOT NULL,
	"orderId" int NOT NULL,
	"productId" int NOT NULL,
	"quantity" int NOT NULL,
	CONSTRAINT "orderItem_pk" PRIMARY KEY ("orderItemId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."orders" (
	"orderId" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"zip" varchar(255) NOT NULL,
	"totalPrice" DECIMAL(10,2) NOT NULL,
	"orderDate" DATE NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."carts" (
  "cartId" serial NOT NULL,
	"productId" int NOT NULL,
	"createdAt" TIMESTAMP WITH time zone DEFAULT NOW(),
	CONSTRAINT "carts_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "products" ADD CONSTRAINT "products_fk0" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId");

ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_fk0" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId");
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_fk1" FOREIGN KEY ("productId") REFERENCES "products"("productId");


ALTER TABLE "carts" ADD CONSTRAINT "carts_fk0" FOREIGN KEY ("productId") REFERENCES "products"("productId");
