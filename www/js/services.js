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
        var members = {};
        var allaccounts = {};
        var allaccounttypes = {};
        var alltransactions = {};
        var transactionRef = {};
        var grouptransaction = {};
        var membertransaction = {};
        //var transactionsbycategoryRef = {};
        //var transactionsbypayeeRef = {};
        var thisGroupId = myCache.get('thisGroupId');
        var thisMemberId = myCache.get('thisMemberId');
        return {
            ref: function () {
                ref = fb.child("members").child(thisMemberId).child("member_accounts");
                return ref;
            },
            getAccounts: function () {
                ref = fb.child("members").child(thisMemberId).child("member_accounts");
                allaccounts = $firebaseArray(ref);
                return allaccounts;
            },
            getAccount: function (accountid) {
                var thisAccount = allaccounts.$getRecord(accountid);
                return thisAccount;
            },
            getAccountTypes: function () {
                ref = fb.child("members").child(thisMemberId).child("member_account_types");
                allaccounttypes = $firebaseArray(ref);
                return allaccounttypes;
            },
            getTransaction: function (transactionid) {
                var thisTransaction = alltransactions.$getRecord(transactionid);
                return thisTransaction;
            },
            getGroupTransaction: function () {
                ref = fb.child("members").child(thisMemberId).child("member_transactions");
                grouptransaction = $firebaseArray(ref);
                return grouptransaction;
            },
            getMemberTransaction: function (memberid) {
                ref = fb.child("members").child(memberid).child("member_transactions");
                membertransaction = $firebaseArray(ref);
                return membertransaction;
            },
            getMemberTransactionsByDate: function (memberid, dateid) {
                ref = fb.child("members").child(memberid).child("member_transactions").orderByChild('date');
                members = $firebaseArray(ref);
                var deferred = $q.defer();
                var matches = members.filter(function (member) {
                if (moment(member.date).format('MMMM DD, YYYY').toLowerCase().indexOf(dateid.toLowerCase()) !== -1) {
                    return true;
                    }
                });
                $timeout(function () {
                deferred.resolve(matches);
                }, 100);
                return deferred.promise;
            },
            getTransactionsByDate: function (accountid) {
                ref = fb.child("members").child(thisMemberId).child("member_transactions").orderByChild('accountId').startAt(accountid).endAt(accountid);
                alltransactions = $firebaseArray(ref);
                return alltransactions;
            },
            getTransactionRef: function (accountid, transactionid) {
                transactionRef = fb.child("members").child(thisMemberId).child("member_transactions").child(accountid).child(transactionid);
                return transactionRef;
            },
            //getTransactionByCategoryRef: function (categoryid, transactionid) {
            //    transactionsbycategoryRef = fb.child("groups").child(thisGroupId).child("membertransactionsbycategory").child(categoryid).child(transactionid);
            //    return transactionsbycategoryRef;
            //},
            //getTransactionByPayeeRef: function (payeeid, transactionid) {
            //    transactionsbypayeeRef = fb.child("groups").child(thisGroupId).child("membertransactionsbypayee").child(payeeid).child(transactionid);
            //    return transactionsbypayeeRef;
            //},
            createNewAccount: function (currentItem) {
                // Create the account
                allaccounts.$add(currentItem).then(function (newChildRef) { });
            },
            saveAccount: function (account) {
                allaccounts.$save(account).then(function (ref) {
                    
                });
            },
            createTransaction: function (currentAccountId, currentItem) {
                //
                var connectedRef = new Firebase('https://zezi.firebaseio.com/.info/connected');
                connectedRef.on('value', function(snap) {
                  if (snap.val() === true) {
                    var otherAccountId = '';
                    var OtherTransaction = {};
                    //
                    if (currentItem.istransfer) {
                        angular.copy(currentItem, OtherTransaction);
                        if (currentAccountId === currentItem.accountToId) {
                            //For current account: transfer is coming into the current account as an income
                            currentItem.type = 'Income';
                            accountId = currentItem.accountToId;
                            otherAccountId = currentItem.accountFromId;
                            OtherTransaction.type = 'Expense';
                        } else {
                            //For current account: transfer is moving into the other account as an expense
                            currentItem.type = 'Expense';
                            accountId = currentItem.accountFromId;
                            otherAccountId = currentItem.accountToId;
                            OtherTransaction.type = 'Income';
                        }
                    } else {
                        currentAccountId = currentItem.accountId;
                    }
                    //
                    // Save transaction
                    //
                    var ref = fb.child("members").child(thisMemberId).child("member_transactions");
                    var newChildRef = ref.push(currentItem);
                    // Save posting public
                    var refPublic = fb.child("publics");
                    refPublic.push({ name: currentItem.addedby, 
                                     location: currentItem.payee,
                                     userid: currentItem.userid,
                                     note: currentItem.note,
                                     photo: currentItem.photo,
                                     date: currentItem.date,
                                     likes:'',
                                     views:'',
                                     comments:''
                                  });
                    //
                    // Update preferences - Last Date Used
                    //
                    var fbAuth = fb.getAuth();
                    var usersRef = MembersFactory.ref();
                    var myUser = usersRef.child(fbAuth.uid);
                    var temp = {
                        lastdate: currentItem.date,
                        note: currentItem.note
                    }
                    myUser.update(temp, function () {
                        CurrentUserService.lastdate = temp.lastdate;
                    });
                    var payee = {};
                    var payeeRef = fb.child("groups").child(thisGroupId).child("memberpayees").child(currentItem.payeeid);
                    if (currentItem.type === "Income") {
                        payee = {
                            lastamountincome: currentItem.amount,
                            lastcategoryincome: currentItem.category,
                            lastcategoryidincome: currentItem.categoryid
                        };
                    } else if (currentItem.type === "Expense") {
                        payee = {
                            lastamount: currentItem.amount,
                            lastcategory: currentItem.category,
                            lastcategoryid: currentItem.categoryid
                        };
                    }
                    payeeRef.update(payee);

                    if (currentItem.istransfer) {
                        //
                        // Save the other transaction, get the transaction id and link it to this transaction
                        //
                        OtherTransaction.linkedtransactionid = newChildRef.key();
                        var othertransRef = fb.child("members").child(thisMemberId).child("transfertransactions").child(otherAccountId);
                        var sync = $firebaseArray(othertransRef);
                        sync.$add(OtherTransaction).then(function (otherChildRef) {
                            //
                            // Update this transaction with other transaction id
                            newChildRef.update({ linkedtransactionid: otherChildRef.key() })
                            //
                        });
                    }
                    var con = myConnectionsRef.push(true);
                        
                    con.onDisconnect().remove();
                    // when I disconnect, update the last time I was seen online
                    lastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
                  }

                    window.localStorage.set("saved", JSON.stringify(currentItem));
                });
                
            },
            deleteTransaction: function () {
                return alltransactions;
            },
            saveTransaction: function (transaction) {
                alltransactions.$save(transaction).then(function (ref) {
                    //ref.key() = transaction.$id;
                });
            }
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
            this.group_id = user.group_id;
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