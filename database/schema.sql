set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "Users" (
	"userId" serial NOT NULL,
	"email" TEXT(255) NOT NULL UNIQUE,
	"hashedPassword" TEXT(255) NOT NULL,
	CONSTRAINT "Users Table_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Product" (
	"productId" serial NOT NULL,
	"title" TEXT(255) NOT NULL,
	"description" TEXT(255) NOT NULL,
	"price" DECIMAL(10,2) NOT NULL,
	"imageUrl" TEXT(255) NOT NULL,
	"categoryId" int NOT NULL,
	CONSTRAINT "Product_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Category" (
	"categoryId" serial NOT NULL,
	"name" TEXT(255) NOT NULL,
	CONSTRAINT "Category table_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Order" (
	"orderId" serial NOT NULL,
	"userId" serial,
	"orderDate" DATE NOT NULL,
	"totalAmount" DECIMAL(10,2) NOT NULL,
	CONSTRAINT "Order Table_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "OrderItem" (
	"orderItemId" serial NOT NULL,
	"orderId" int NOT NULL,
	"productId" int NOT NULL,
	"quantity" int NOT NULL,
	"price" DECIMAL NOT NULL,
	CONSTRAINT "OrderItem table_pk" PRIMARY KEY ("orderItemId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Cart" (
	"cartId" serial NOT NULL,
	"userId" int NOT NULL,
	CONSTRAINT "Cart Table_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "CartItem" (
	"cartItemId" serial NOT NULL,
	"cartId" int NOT NULL,
	"productId" int NOT NULL,
	"quantity" int NOT NULL,
	CONSTRAINT "CartItem table_pk" PRIMARY KEY ("cartItemId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Product" ADD CONSTRAINT "Product Table_fk0" FOREIGN KEY ("categoryId") REFERENCES "Category table"("categoryId");


ALTER TABLE "Order Table" ADD CONSTRAINT "Order Table_fk0" FOREIGN KEY ("userId") REFERENCES "Users Table"("userId");

ALTER TABLE "OrderItem table" ADD CONSTRAINT "OrderItem table_fk0" FOREIGN KEY ("orderId") REFERENCES "Order Table"("orderId");
ALTER TABLE "OrderItem table" ADD CONSTRAINT "OrderItem table_fk1" FOREIGN KEY ("productId") REFERENCES "Product Table"("productId");

ALTER TABLE "Cart Table" ADD CONSTRAINT "Cart Table_fk0" FOREIGN KEY ("userId") REFERENCES "Users Table"("userId");

ALTER TABLE "CartItem table" ADD CONSTRAINT "CartItem table_fk0" FOREIGN KEY ("cartId") REFERENCES "Cart Table"("cartId");
ALTER TABLE "CartItem table" ADD CONSTRAINT "CartItem table_fk1" FOREIGN KEY ("productId") REFERENCES "Product Table"("productId");
