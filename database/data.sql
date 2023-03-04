insert into "categories" ("categoryId", "name", "description")
values (1, 'smartphones', 'electroni devices'),
(2, 'laptops', 'electroni devices'),
(3, 'perfumes', 'perfumes');

INSERT INTO "products" ("productId", "name", "description", "imageUrl", "price", "categoryId")
values (1, 'iPhone 9', 'An apple mobile which is nothing like apple', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg', 549, 1),
(2, 'iPhone X', 'An apple mobile which is nothing like apple', 'https://i.dummyjson.com/data/products/2/thumbnail.jpg', 899, 1),
(3, 'Samsung Universe 9', 'Samsungs new variant which goes beyond Galaxy to the Universe', 'https://i.dummyjson.com/data/products/3/thumbnail.jpg', 1249, 1),
(4, 'OPPOF19', 'OPPO F19 is officially announced on April 2021.', 'https://i.dummyjson.com/data/products/4/thumbnail.jpg', 280, 1),
(5, 'Huawei P30', 'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.', 'https://i.dummyjson.com/data/products/5/thumbnail.jpg', 499, 1),
(6, 'MacBook Pro', 'MacBook Pro 2021 with mini-LED display may launch between September, November', 'https://i.dummyjson.com/data/products/6/thumbnail.png', 1749, 2),
(7, 'Samsung Galaxy Book', 'Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched', 'https://i.dummyjson.com/data/products/7/thumbnail.jpg', 1499, 2),
(8, 'Microsoft Surface Laptop 4', 'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.', 'https://i.dummyjson.com/data/products/8/thumbnail.jpg', 1499, 2),
(9, 'Infinix INBOOK', 'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty', 'https://i.dummyjson.com/data/products/9/thumbnail.jpg', 1099, 2),
(10, 'HP Pavilion 15-DK1056WM', 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10', 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg', 1099, 2),
(11, 'perfume Oil', 'Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil', 'https://i.dummyjson.com/data/products/11/thumbnail.jpg', 13, 3),
(12, 'Brown Perfume', 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml"', 'https://i.dummyjson.com/data/products/12/thumbnail.jpg', 40, 3),
(13, 'Fog Scent Xpressio Perfume', 'Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men', 'https://i.dummyjson.com/data/products/13/thumbnail.webp', 13, 3);
