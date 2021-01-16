new Vue({
    el: '#app',
    data: {
        isShowingCart: false,
        cart: {
            items: []
        },

        products: [{
                id: 1,
                name: 'অন্তরের রোগ ২ খন্ড',
                description: 'অন্তরের রোগ বইটি লিখেছেন শাইখ সালেহ আল মুনাজ্জিদ হাফি., দুই খন্ডে বইটি প্রকাশ করেছে রুহামা প্রকাশনী',
                price: 500,
                inStock: 50
            },
            {
                id: 2,
                name: 'অন্তরের আমল - ২ খন্ড',
                description: 'অন্তরের আমল বইটি লিখেছেন শাইখ সালেহ আল মুনাজ্জিদ হাফি., দুই খন্ডে বইটি প্রকাশ করেছে রুহামা প্রকাশনী',
                price: 600,
                inStock: 755
            },
            {
                id: 3,
                name: 'রুহের চিকিৎসা',
                description: 'ইবনে তাইমিয়্যাহ রহ. লিখিতি এই বইটি প্রকাশিত হয়েছে মাকতাবাতুল আসসালাফ থেকে ২০২১ সালের অনলাইন বই মেলায়',
                price: 350,
                inStock: 5
            },
            {
                id: 4,
                name: 'ইসলামি ইতিহাস - ৫ খন্ড',
                description: 'ড. রাগেব সারজনি লিখিত ইসলামের ইতিহাস বইটি প্রকাশিত হয়েছে মাকতাবাতুল হাসান থেকে, এই বইটি মোট ৫টি খন্ডে প্রকাশিত হয়েছে।',
                price: 1400,
                inStock: 42
            },
            {
                id: 5,
                name: 'সিরাতুন নবী সা. - ৪ খন্ড',
                description: 'বিশুদ্ধ হাদিসের আলোকে রাসূল সা. এর সম্পূর্ণ জীবনী প্রকাশিত হয়েছে মাকতাবাতুল বায়ান থেকে মোট ৪ খন্ডে',
                price: 1040,
                inStock: 0
            },
            {
                id: 6,
                name: 'যেমন ছিলেন তিনি সা. - ২ খন্ড',
                description: 'যেমন ছিলেন তিনি বইটি শাইখ সালেহ আল-মুনাজ্জিদ হাফি. লিখিত একটি সিরাত যা রুহামা প্রকাশনী থেকে মোট ২ খন্ডে প্রকাশিত হয়েছে',
                price: 900,
                inStock: 81
            }
        ]
    },

    computed: {
        cartTotal: function () {
            var total = 0;
            this.cart.items.forEach(function (item) {
                total += item.quantity * item.product.price;
            });

            return total;
        },
        taxAmount: function () {
            return ((this.cartTotal * 2) / 100)
        }
    },

    methods: {
        addProductToCart: function (product) {
            var cartItem = this.getCartItem(product);
            if (cartItem != null) {
                cartItem.quantity++;
            } else {
                this.cart.items.push({
                    product: product,
                    quantity: 1
                });
            }


            product.inStock--;
        },

        getCartItem: function (product) {
            for (var i = 0; i < this.cart.items.length; i++) {
                if (this.cart.items[i].product.id === product.id) {
                    return this.cart.items[i];
                }
            }

            return null;
        },
        increaseQuantity: function (cartItem) {
            cartItem.product.inStock--;
            cartItem.quantity++;
        },

        decreaseQuantity: function (cartItem) {
            cartItem.quantity--;
            cartItem.product.inStock++;

            if (cartItem.quantity == 0) {
                this.removeItemFromCart(cartItem);
            }
        },

        removeItemFromCart: function (cartItem) {
            var index = this.cart.items.indexOf(cartItem);

            if (index !== -1) {
                this.cart.items.splice(index, 1);
            }
        }
    },

    filters: {
        currency: function (value) {
            var formatter = Intl.NumberFormat('bn', {
                style: 'currency',
                currency: 'BDT',
                minimumFractionDigits: 0
            });

            return formatter.format(value);
        }
    }
});