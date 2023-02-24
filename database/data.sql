CREATE TABLE "public.Users Table" (
	"user_id" serial NOT NULL,
	"email" TEXT(255) NOT NULL UNIQUE,
	"hashedPassword" TEXT(255) NOT NULL,
	CONSTRAINT "Users Table_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Product Table" (
	"product_id" serial NOT NULL,
	"title" TEXT(255) NOT NULL,
	"description" TEXT(255) NOT NULL,
	"price" DECIMAL(10,2) NOT NULL,
	"image_url" TEXT(255) NOT NULL,
	"category_id" int NOT NULL,
	CONSTRAINT "Product Table_pk" PRIMARY KEY ("product_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Category table" (
	"category_id" serial NOT NULL,
	"name" TEXT(255) NOT NULL,
	CONSTRAINT "Category table_pk" PRIMARY KEY ("category_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Order Table" (
	"order_id" serial NOT NULL,
	"user_id" serial,
	"order_date" DATE NOT NULL,
	"total_amount" DECIMAL(10,2) NOT NULL,
	CONSTRAINT "Order Table_pk" PRIMARY KEY ("order_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.OrderItem table" (
	"order_item_id" serial NOT NULL,
	"order_id" int NOT NULL,
	"product_id" int NOT NULL,
	"quantity" int NOT NULL,
	"price" DECIMAL NOT NULL,
	CONSTRAINT "OrderItem table_pk" PRIMARY KEY ("order_item_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Cart Table" (
	"cart_id" serial NOT NULL,
	"user_id" int NOT NULL,
	CONSTRAINT "Cart Table_pk" PRIMARY KEY ("cart_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.CartItem table" (
	"cart_item_id" serial NOT NULL,
	"cart_id" int NOT NULL,
	"product_id" int NOT NULL,
	"quantity" int NOT NULL,
	CONSTRAINT "CartItem table_pk" PRIMARY KEY ("cart_item_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Product Table" ADD CONSTRAINT "Product Table_fk0" FOREIGN KEY ("category_id") REFERENCES "Category table"("category_id");


ALTER TABLE "Order Table" ADD CONSTRAINT "Order Table_fk0" FOREIGN KEY ("user_id") REFERENCES "Users Table"("user_id");

ALTER TABLE "OrderItem table" ADD CONSTRAINT "OrderItem table_fk0" FOREIGN KEY ("order_id") REFERENCES "Order Table"("order_id");
ALTER TABLE "OrderItem table" ADD CONSTRAINT "OrderItem table_fk1" FOREIGN KEY ("product_id") REFERENCES "Product Table"("product_id");

ALTER TABLE "Cart Table" ADD CONSTRAINT "Cart Table_fk0" FOREIGN KEY ("user_id") REFERENCES "Users Table"("user_id");

ALTER TABLE "CartItem table" ADD CONSTRAINT "CartItem table_fk0" FOREIGN KEY ("cart_id") REFERENCES "Cart Table"("cart_id");
ALTER TABLE "CartItem table" ADD CONSTRAINT "CartItem table_fk1" FOREIGN KEY ("product_id") REFERENCES "Product Table"("product_id");
