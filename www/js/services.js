angular.module('starter.services', [])

.factory('Auth', function ($firebaseAuth) {
        return $firebaseAuth(fb);
})

.factory('myCache', function ($cacheFactory) {
        return $cacheFactory('myCache', function ($cacheFactory) {
            return $cacheFactory('myCache');
        });
})

.factory('MembersFactory', function ($firebaseArray, $q, myCache, $timeout) {
        var ref = fb.child("users");
        var mRef = {};
        var members = {};
        mRef = fb.child("members").orderByChild('group_id');
        members = $firebaseArray(mRef);
        return {
            ref: function () {
                return ref;
            },
            getMember: function (authData) {
                var deferred = $q.defer();
                var memberRef = ref.child(authData.uid);
                memberRef.once("value", function (snap) {
                    deferred.resolve(snap.val());
                });
                return deferred.promise;
            },
            updateMember: function (userId) {
                var deferred = $q.defer();
                var memberRef = ref.child(userId);
                memberRef.once("value", function (snap) {
                    deferred.resolve(snap.val());
                });
                return deferred.promise;
            },
            getMemberByCode: function (thisGroup) {
                var deferred = $q.defer();
                var matches = members.filter(function (member) {
                if (member.group_id.toLowerCase().indexOf(thisGroup.toLowerCase()) !== -1) {
                    return true;
                    }
                });
                $timeout(function () {
                deferred.resolve(matches);
                }, 100);
                return deferred.promise;
            },
            getMemberById: function (memberid) {
                var deferred = $q.defer();
                var idRef = ref.child(memberid);
                idRef.once("value", function (snap) {
                    deferred.resolve(snap.val());
                });
                return deferred.promise;
            },
        };
})

.factory('TransactionFactory', function ($firebaseArray, $q, myCache, CurrentUserService, $timeout) {
        var ref = {};
        var transactionsRef = {};
        var ordersRef = {};
        var tRef = fb.child("transactions").child("orders");
        return {
            ref: function () {
                ref = fb.child("publics").child(thisPublicId).child(thisUserId);
                return ref;
            },
            tRef: function () {
                return tRef;
            },
            getTransactions: function () {
                ref = fb.child("transactions").child("orders").orderByChild('kode');
                transactionsRef = $firebaseArray(ref);
                return transactionsRef;
            },
            getOrders: function () {
                ref = fb.child("transactions").child("orders");
                ordersRef = $firebaseArray(ref);
                return ordersRef;
            },

            getDimension: function (thisProcess) {
                ref = fb.child("transactions").child("orders").orderByChild("process").equalTo(thisProcess);
                ordersRef = $firebaseArray(ref);
                return ordersRef;
            },
            getTransaction: function (transactionid) {
                var thisMaterial = transactionsRef.$getRecord(transactionid);
                return thisMaterial;
            },
            saveTransaction: function (temp) {
                transactionsRef.$save(temp).then(function (ref) {
                    //ref.key() = posting.$id;
                });
            }
            
            
        };
})

.factory('MasterFactory', function ($firebaseArray, $q, myCache, CurrentUserService) {
        var ref = {};
        var materialsRef = {};
        var inventoriesRef = {};
        var productsRef = {};
        var pricesRef = {};
        var susutsRef = {};
        var sanksRef = {};
        var sankcostRef = {};
        var raws = {};
        var mRef = fb.child("master").child("material");
        var iRef = fb.child("master").child("inventory");
        var pRef = fb.child("master").child("product");
        var prRef = fb.child("master").child("price");
        var sRef = fb.child("master").child("susut");
        var skRef = fb.child("master").child("sank");
        return {
            ref: function () {
                ref = fb.child("publics").child(thisPublicId).child(thisUserId);
                return ref;
            },
            mRef: function () {
                return mRef;
            },
            iRef: function () {
                return iRef;
            },
            pRef: function () {
                return pRef;
            },
            prRef: function () {
                return prRef;
            },
            sRef: function () {
                return sRef;
            },
            skRef: function () {
                return skRef;
            },
            getMaterials: function () {
                ref = fb.child("master").child("material").orderByChild('jenis');
                materialsRef = $firebaseArray(ref);
                return materialsRef;
            },
            getMaterial: function (materialid) {
                var thisMaterial = materialsRef.$getRecord(materialid);
                return thisMaterial;
            },
            getInventories: function () {
                ref = fb.child("master").child("inventory").orderByChild('name');
                inventoriesRef = $firebaseArray(ref);
                return inventoriesRef;
            },
            getProducts: function () {
                ref = fb.child("master").child("product").orderByChild('nama');
                productsRef = $firebaseArray(ref);
                return productsRef;
            },
            getPrices: function () {
                ref = fb.child("master").child("price").orderByChild('price');
                pricesRef = $firebaseArray(ref);
                return pricesRef;
            },
            getSusuts: function () {
                ref = fb.child("master").child("susut").orderByChild('susut');
                susutsRef = $firebaseArray(ref);
                return susutsRef;
            },
            getSanks: function () {
                ref = fb.child("master").child("sank").orderByChild('sank');
                sanksRef = $firebaseArray(ref);
                return sanksRef;
            },
            getSankCost: function () {
                var deferred = $q.defer();
                var memberRef = fb.child("master").child("sank").child("-KROJDSnXGhET76giV05");
                memberRef.once("value", function (snap) {
                    deferred.resolve(snap.val());
                });
                return deferred.promise;
            },
            getInventory: function (inventoryid) {
                var thisInventory = inventoriesRef.$getRecord(inventoryid);
                return thisInventory;
            },
            getProduct: function (productid) {
                var thisProduct = productsRef.$getRecord(productid);
                return thisProduct;
            },
            getPrice: function (priceid) {
                var thisPrice = pricesRef.$getRecord(priceid);
                return thisPrice;
            },
            getSusut: function (susutid) {
                var thisSusut = susutsRef.$getRecord(susutid);
                return thisSusut;
            },
            getSank: function (sankid) {
                var thisSank = sanksRef.$getRecord(sankid);
                return thisSank;
            },
            saveMaterial: function (temp) {
                materialsRef.$save(temp).then(function (ref) {
                    //ref.key() = posting.$id;
                });
            }
            
            
        };
})

.factory('ContactsFactory', function ($firebaseArray, $q, myCache, MembersFactory, CurrentUserService) {
        var ref = {};
        var contactsRef = {};
        var eRef = fb.child("employees");
        return {
            ref: function () {
                ref = fb.child("publics").child(thisPublicId).child(thisUserId);
                return ref;
            },
            eRef: function () {
                return eRef;
            },
            getContacts: function () {
                ref = fb.child("employees").orderByKey();
                contactsRef = $firebaseArray(ref);
                return contactsRef;
            },
            getEmployee: function (employeeid) {
                var thisEmployee = contactsRef.$getRecord(employeeid);
                return thisEmployee;
            },
            
            
        };
})

.factory('AccountsFactory', function ($firebaseArray, $q, myCache, MembersFactory, CurrentUserService, $timeout) {
        var ref = {};
        var usersRef = {};
        var uRef = fb.child("users");
        return {
            ref: function () {
                ref = fb.child("publics").child(thisPublicId).child(thisUserId);
                return ref;
            },
            uRef: function () {
                return uRef;
            },
            getUsers: function () {
                ref = fb.child("users").orderByKey();
                usersRef = $firebaseArray(ref);
                return usersRef;
            },
            getUser: function (employeeid) {
                var thisEmployee = usersRef.$getRecord(employeeid);
                return thisEmployee;
            },
            
            
        };
})

.factory('PayeesService', function ($firebaseArray, $q, myCache) {
        var ref = {};
        var allpayees = {};
        var payeesRef = {};
        var payeeRef = {};
        //var transactionsByPayeeRef = {};
        //var transactionsByCategoryRef = {};
        var thisGroupId = myCache.get('thisGroupId');
        var thisMemberId = myCache.get('thisMemberId');
        return {
            getPayees: function () {
                ref = fb.child("groups").child(thisGroupId).child("memberpayees").orderByChild('payeesort');
                allpayees = $firebaseArray(ref);
                return allpayees;
            },
            getPayee: function (payeeid) {
                var deferred = $q.defer();
                ref = fb.child("groups").child(thisGroupId).child("memberpayees").child(payeeid);
                ref.once("value", function (snap) {
                    deferred.resolve(snap.val());
                });
                return deferred.promise;
            },
            //getTransactionsByPayee: function (payeeid) {
            //    ref = fb.child("groups").child(thisGroupId).child("membertransactionsbypayee").child(payeeid);
            //    transactionsByPayeeRef = $firebaseArray(ref);
            //    return transactionsByPayeeRef;
            //},
            //getTransactionsByCategory: function (categoryid) {
            //    ref = fb.child("groups").child(thisGroupId).child("membertransactionsbycategory").child(categoryid);
            //    transactionsByCategoryRef = $firebaseArray(ref);
            //    return transactionsByCategoryRef;
            //},
            getPayeesRef: function () {
                payeesRef = fb.child("groups").child(thisGroupId).child("memberpayees");
                return payeesRef;
            },
            getPayeeRef: function (payeeid) {
                payeeRef = fb.child("groups").child(thisGroupId).child("memberpayees").child(payeeid);
                return payeeRef;
            },
            savePayee: function (payee) {
                allpayees.$save(payee).then(function (ref) {
                    //ref.key() = payee.$id;
                });
            }
        };
})

.factory('PayeesFactory', function ($firebaseArray, $q, $timeout, myCache) {
       var ref = {};
        var payees = {};
        var thisGroupId = myCache.get('thisGroupId');
        ref = fb.child("groups").child(thisGroupId).child("memberpayees").orderByChild('payeename');
        payees = $firebaseArray(ref);
        return {
            searchPayees: function (searchFilter) {
                var deferred = $q.defer();
                var matches = payees.filter(function (payee) {
                    if (payee.payeename.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1) {
                        return true;
                    }
                });
                $timeout(function () {
                    deferred.resolve(matches);
                }, 100);
                return deferred.promise;
            },
        };
})

.service("CategoryTypeService", function () {
        var cattype = this;
        cattype.updateType = function (value) {
            this.typeSelected = value;
        }
})

.service("PickParentCategoryService", function () {
        var cat = this;
        cat.updateParentCategory = function (value) {
            this.parentcategorySelected = value;
        }
})

.service("PickCategoryTypeService", function () {
        var type = this;
        type.updateType = function (value) {
            this.typeSelected = value;
        }
})

.service("ChatService", function () {
        var type = this;
        type.selectChat = function (value) {
            this.chatSelected = value;
        }
})

    // Current User
.service("CurrentUserService", function () {
        var thisUser = this;
        thisUser.updateUser = function (user) {
            this.fullname = user.fullname;
            this.level = user.level;
            this.email = user.email;
            this.id = user.$id;
            this.public_id = user.public_id;
            this.defaultdate = user.defaultdate;
            this.defaultbalance = user.defaultbalance;
            this.lastdate = user.lastdate;
            this.group_name = user.group_name;
            this.picture = user.picture;
            this.note = user.note;
            this.phone = user.phone;
        }
})

    // Account Pick Lists
.service("SelectAccountServices", function () {
        var accountDate = this;
        var accountType = this;
        accountDate.updateDate = function (value) {
            this.dateSelected = value;
        }
        accountType.updateType = function (value) {
            this.typeSelected = value;
        }
})

    // Transaction Pick Lists
.service("PickTransactionServices", function () {
        var transactionType = this;
        var transCategory = this;
        var transPayee = this;
        var transDate = this;
        var transAmount = this;
        var transAccount = this;
        var transAccountFrom = this;
        var transAccountTo = this;
        var transPhoto = this;
        var transNote = this;
        var transSearch = this;
        transactionType.updateType = function (value, type) {
            this.typeDisplaySelected = value;
            this.typeInternalSelected = type;
        }
        transCategory.updateCategory = function (value, id) {
            this.categorySelected = value;
            this.categoryid = id;
        }
        transPayee.updatePayee = function (payee, id, type) {
            this.payeeSelected = payee.payeename;
            if (type === "Income") {
                this.categorySelected = payee.lastcategoryincome;
                this.categoryid = payee.lastcategoryidincome;
                this.amountSelected = payee.lastamountincome;
                this.payeeid = id;
            } else if (type === "Expense") {
                this.categorySelected = payee.lastcategory;
                this.categoryid = payee.lastcategoryid;
                this.amountSelected = payee.lastamount;
                this.payeeid = id;
            }
        }
        transDate.updateDate = function (value) {
            this.dateSelected = value;
        }
        transDate.updateTime = function (value) {
            this.timeSelected = value;
        }
        transAmount.updateAmount = function (value) {
            this.amountSelected = value;
        }
        transAccount.updateAccount = function (value, id) {
            this.accountSelected = value;
            this.accountId = id;
        }
        transAccountFrom.updateAccountFrom = function (value, id) {
            this.accountFromSelected = value;
            this.accountFromId = id;
        }
        transAccountTo.updateAccountTo = function (value, id) {
            this.accountToSelected = value;
            this.accountToId = id;
        }
        transPhoto.updatePhoto = function (value) {
            this.photoSelected = value;
        }
        transNote.updateNote = function (value) {
            this.noteSelected = value;
        }
        transSearch.updateSearch = function (value) {
            this.searchSelected = value;
        }
})

.filter('reverselist', function () {
        function toArray(list) {
            var k, out = [];
            if (list) {
                if (angular.isArray(list)) {
                    out = list;
                }
                else if (typeof (list) === 'object') {
                    for (k in list) {
                        if (list.hasOwnProperty(k)) {
                            out.push(list[k]);
                        }
                    }
                }
            }
            return out;
        }
        return function (items) {
            return toArray(items).slice().reverse();
        };
})

.filter('filtered', function (type) {
        return function (list) {
            var filtered = {};
            angular.forEach(list, function (transaction, id) {
                if (type === 'active') {
                    if (!transaction.iscleared) {
                        filtered[id] = transaction;
                    }
                } else if (type === 'cleared') {
                    if (transaction.iscleared) {
                        filtered[id] = transaction;
                    }
                } else {
                    filtered[id] = transaction;
                }
            });
            return filtered;
        };
})

    // 
    // http://gonehybrid.com/how-to-group-items-in-ionics-collection-repeat/
    //
.filter('groupByMonthYear', function ($parse) {
        var dividers = {};
        return function (input) {
            if (!input || !input.length) {
                return;
            }
            var output = [],
                previousDate,
                currentDate,
                item;
            for (var i = 0, ii = input.length; i < ii && (item = input[i]) ; i++) {
                currentDate = moment(item.date);
                if (!previousDate ||
                    currentDate.month() !== previousDate.month() ||
                    currentDate.year() !== previousDate.year()) {
                    var dividerId = currentDate.format('MMYYYY');
                    if (!dividers[dividerId]) {
                        dividers[dividerId] = {
                            isDivider: true,
                            divider: currentDate.format('MMMM YYYY')
                        };
                    }
                    output.push(dividers[dividerId]);
                }
                output.push(item);
                previousDate = currentDate;
            }
            return output;
        };
})

    // 
    // http://gonehybrid.com/how-to-group-items-in-ionics-collection-repeat/
    //
.filter('groupByDayMonthYear', function ($parse) {
        var dividers = {};
        return function (input) {
            if (!input || !input.length) {
                return;
            }
            var output = [],
                previousDate,
                previousDividerId,
                currentDate,
                item;
            for (var i = 0, ii = input.length; i < ii && (item = input[i]) ; i++) {
                currentDate = moment(item.date);
                var dividerId = moment(currentDate).format('YYYYMMDD');
                if (!previousDate || previousDividerId !== dividerId) {
                    //console.log(dividerId);
                    //console.log(item);
                    if (!dividers[dividerId]) {
                        dividers[dividerId] = {
                            isDivider: true,
                            _id: dividerId,
                            divider: currentDate.format('dddd, MMMM DD, YYYY')
                        };
                    }
                    output.push(dividers[dividerId]);
                }
                output.push(item);
                previousDate = currentDate;
                previousDividerId = dividerId
            }
            //console.log(output);
            return output;
        };
})

    
;

function RandomHouseCode() {
    return Math.floor((Math.random() * 100000000) + 100);
}