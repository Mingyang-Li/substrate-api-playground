"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AccountsStakingPayoutsService = void 0;
var calc_1 = require("@substrate/calc");
var http_errors_1 = require("http-errors");
var AbstractService_1 = require("../AbstractService");
var AccountsStakingPayoutsService = /** @class */ (function (_super) {
    __extends(AccountsStakingPayoutsService, _super);
    function AccountsStakingPayoutsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Fetch and derive payouts for `address`.
     *
     * @param hash `BlockHash` to make call at
     * @param address address of the _Stash_  account to get the payouts of
     * @param depth number of eras to query at and below the specified era
     * @param era the most recent era to query
     * @param unclaimedOnly whether or not to only show unclaimed payouts
     */
    AccountsStakingPayoutsService.prototype.fetchAccountStakingPayout = function (hash, address, depth, era, unclaimedOnly, currentEra) {
        return __awaiter(this, void 0, void 0, function () {
            var api, _a, number, historyDepth, at, startEra, allErasGeneral, allErasCommissions, allEraData;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        api = this.api;
                        return [4 /*yield*/, Promise.all([
                                api.rpc.chain.getHeader(hash),
                                api.query.staking.historyDepth.at(hash),
                            ])];
                    case 1:
                        _a = _b.sent(), number = _a[0].number, historyDepth = _a[1];
                        // Information is kept for eras in `[current_era - history_depth; current_era]`
                        if (depth > historyDepth.toNumber()) {
                            throw new http_errors_1.BadRequest('Must specify a depth less than history_depth');
                        }
                        if (era - (depth - 1) < currentEra - historyDepth.toNumber()) {
                            // In scenarios where depth is not > historyDepth, but the user specifies an era
                            // and historyDepth combo that would lead to querying eras older than history depth
                            throw new http_errors_1.BadRequest('Must specify era and depth such that era - (depth - 1) is less ' +
                                'than or equal to current_era - history_depth.');
                        }
                        at = {
                            height: number.unwrap().toString(10),
                            hash: hash
                        };
                        startEra = Math.max(0, era - (depth - 1));
                        return [4 /*yield*/, this.fetchAllErasGeneral(api, hash, startEra, era)];
                    case 2:
                        allErasGeneral = _b.sent();
                        return [4 /*yield*/, this.fetchAllErasCommissions(api, hash, address, startEra, 
                            // Create an array of `DeriveEraExposure`
                            allErasGeneral.map(function (eraGeneral) { return eraGeneral[0]; }))];
                    case 3:
                        allErasCommissions = _b.sent();
                        allEraData = allErasGeneral.map(function (_a, idx) {
                            var deriveEraExposure = _a[0], eraRewardPoints = _a[1], erasValidatorRewardOption = _a[2];
                            var eraCommissions = allErasCommissions[idx];
                            var nominatedExposures = _this.deriveNominatedExposures(address, deriveEraExposure);
                            // Zip the `validatorId` with its associated `commission`, making the data easier to reason
                            // about downstream
                            var exposuresWithCommission = nominatedExposures === null || nominatedExposures === void 0 ? void 0 : nominatedExposures.map(function (_a, idx) {
                                var validatorId = _a.validatorId;
                                return __assign({ validatorId: validatorId }, eraCommissions[idx]);
                            });
                            return {
                                deriveEraExposure: deriveEraExposure,
                                eraRewardPoints: eraRewardPoints,
                                erasValidatorRewardOption: erasValidatorRewardOption,
                                exposuresWithCommission: exposuresWithCommission,
                                eraIndex: api.createType('EraIndex', idx + startEra)
                            };
                        });
                        return [2 /*return*/, {
                                at: at,
                                erasPayouts: allEraData.map(function (eraData) {
                                    return _this.deriveEraPayouts(address, unclaimedOnly, eraData);
                                })
                            }];
                }
            });
        });
    };
    /**
     * Fetch general info about eras in the inclusive range `startEra` .. `era`.
     *
     * @param api `ApiPromise`
     * @param hash `BlockHash` to make call at
     * @param startEra first era to get data for
     * @param era the last era to get data for
     */
    AccountsStakingPayoutsService.prototype.fetchAllErasGeneral = function (api, hash, startEra, era) {
        return __awaiter(this, void 0, void 0, function () {
            var allDeriveQuerys, e, eraIndex, eraGeneralTuple;
            return __generator(this, function (_a) {
                allDeriveQuerys = [];
                for (e = startEra; e <= era; e += 1) {
                    eraIndex = api.createType('EraIndex', e);
                    eraGeneralTuple = Promise.all([
                        api.derive.staking.eraExposure(eraIndex),
                        api.query.staking.erasRewardPoints.at(hash, eraIndex),
                        api.query.staking.erasValidatorReward.at(hash, eraIndex),
                    ]);
                    allDeriveQuerys.push(eraGeneralTuple);
                }
                return [2 /*return*/, Promise.all(allDeriveQuerys)];
            });
        });
    };
    /**
     * Fetch the commission & staking ledger for each `validatorId` in `deriveErasExposures`.
     *
     * @param api `ApiPromise`
     * @param hash `BlockHash` to make call at
     * @param address address of the _Stash_  account to get the payouts of
     * @param startEra first era to get data for
     * @param deriveErasExposures exposures per era for `address`
     */
    AccountsStakingPayoutsService.prototype.fetchAllErasCommissions = function (api, hash, address, startEra, deriveErasExposures) {
        var _this = this;
        // Cache StakingLedger to reduce redundant queries to node
        var validatorLedgerCache = {};
        var allErasCommissions = deriveErasExposures.map(function (deriveEraExposure, idx) {
            var currEra = idx + startEra;
            var nominatedExposures = _this.deriveNominatedExposures(address, deriveEraExposure);
            if (!nominatedExposures) {
                return [];
            }
            var singleEraCommissions = nominatedExposures.map(function (_a) {
                var validatorId = _a.validatorId;
                return _this.fetchCommissionAndLedger(api, validatorId, currEra, hash, validatorLedgerCache);
            });
            return Promise.all(singleEraCommissions);
        });
        return Promise.all(allErasCommissions);
    };
    /**
     * Derive all the payouts for `address` at `era`.
     *
     * @param address address of the _Stash_  account to get the payouts of
     * @param era the era to query
     * @param eraData data about the address and era we are calculating payouts for
     */
    AccountsStakingPayoutsService.prototype.deriveEraPayouts = function (address, unclaimedOnly, _a) {
        var deriveEraExposure = _a.deriveEraExposure, eraRewardPoints = _a.eraRewardPoints, erasValidatorRewardOption = _a.erasValidatorRewardOption, exposuresWithCommission = _a.exposuresWithCommission, eraIndex = _a.eraIndex;
        if (!exposuresWithCommission) {
            return {
                message: address + " has no nominations for the era " + eraIndex.toString()
            };
        }
        if (erasValidatorRewardOption.isNone) {
            return {
                message: "No ErasValidatorReward for the era " + eraIndex.toString()
            };
        }
        var totalEraRewardPoints = eraRewardPoints.total;
        var totalEraPayout = erasValidatorRewardOption.unwrap();
        var calcPayout = calc_1.CalcPayout.from_params(totalEraRewardPoints.toNumber(), totalEraPayout.toString(10));
        // Iterate through validators that this nominator backs and calculate payouts for the era
        var payouts = [];
        for (var _i = 0, exposuresWithCommission_1 = exposuresWithCommission; _i < exposuresWithCommission_1.length; _i++) {
            var _b = exposuresWithCommission_1[_i], validatorId = _b.validatorId, validatorCommission = _b.commission, validatorLedger = _b.validatorLedger;
            var totalValidatorRewardPoints = this.extractTotalValidatorRewardPoints(eraRewardPoints, validatorId);
            if (!totalValidatorRewardPoints ||
                (totalValidatorRewardPoints === null || totalValidatorRewardPoints === void 0 ? void 0 : totalValidatorRewardPoints.toNumber()) === 0) {
                // Nothing to do if there are no reward points for the validator
                continue;
            }
            var _c = this.extractExposure(address, validatorId, deriveEraExposure), totalExposure = _c.totalExposure, nominatorExposure = _c.nominatorExposure;
            if (nominatorExposure === undefined) {
                // This should not happen once at this point, but here for safety
                continue;
            }
            if (!validatorLedger) {
                continue;
            }
            // Check if the reward has already been claimed
            var claimed = validatorLedger.claimedRewards.includes(eraIndex);
            if (unclaimedOnly && claimed) {
                continue;
            }
            var nominatorStakingPayout = calcPayout.calc_payout(totalValidatorRewardPoints.toNumber(), validatorCommission.toNumber(), nominatorExposure.unwrap().toString(10), totalExposure.unwrap().toString(10), address === validatorId);
            payouts.push({
                validatorId: validatorId,
                nominatorStakingPayout: nominatorStakingPayout,
                claimed: claimed,
                totalValidatorRewardPoints: totalValidatorRewardPoints,
                validatorCommission: validatorCommission,
                totalValidatorExposure: totalExposure.unwrap(),
                nominatorExposure: nominatorExposure.unwrap()
            });
        }
        return {
            era: eraIndex,
            totalEraRewardPoints: totalEraRewardPoints,
            totalEraPayout: totalEraPayout,
            payouts: payouts
        };
    };
    /**
     * Fetch the `commission` and `StakingLedger` of `validatorId`.
     *
     * @param api
     * @param validatorId accountId of a validator's _Stash_  account
     * @param era the era to query
     * @param hash `BlockHash` to make call at
     * @param validatorLedgerCache object mapping validatorId => StakingLedger to limit redundant queries
     */
    AccountsStakingPayoutsService.prototype.fetchCommissionAndLedger = function (api, validatorId, era, hash, validatorLedgerCache) {
        return __awaiter(this, void 0, void 0, function () {
            var commission, validatorLedger, prefs, _a, prefs, validatorControllerOption, validatorLedgerOption;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(validatorId in validatorLedgerCache)) return [3 /*break*/, 2];
                        validatorLedger = validatorLedgerCache[validatorId];
                        return [4 /*yield*/, api.query.staking.erasValidatorPrefs(era, validatorId)];
                    case 1:
                        prefs = _b.sent();
                        commission = prefs.commission.unwrap();
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, Promise.all([
                            api.query.staking.erasValidatorPrefs.at(hash, era, validatorId),
                            api.query.staking.bonded.at(hash, validatorId),
                        ])];
                    case 3:
                        _a = _b.sent(), prefs = _a[0], validatorControllerOption = _a[1];
                        commission = prefs.commission.unwrap();
                        if (validatorControllerOption.isNone) {
                            return [2 /*return*/, {
                                    commission: commission
                                }];
                        }
                        return [4 /*yield*/, api.query.staking.ledger.at(hash, validatorControllerOption.unwrap())];
                    case 4:
                        validatorLedgerOption = _b.sent();
                        if (validatorLedgerOption.isNone) {
                            return [2 /*return*/, {
                                    commission: commission
                                }];
                        }
                        validatorLedger = validatorLedgerOption.unwrap();
                        validatorLedgerCache[validatorId] = validatorLedger;
                        _b.label = 5;
                    case 5: return [2 /*return*/, { commission: commission, validatorLedger: validatorLedger }];
                }
            });
        });
    };
    /**
     * Extract the reward points of `validatorId` from `EraRewardPoints`.
     *
     * @param eraRewardPoints
     * @param validatorId accountId of a validator's _Stash_  account
     * */
    AccountsStakingPayoutsService.prototype.extractTotalValidatorRewardPoints = function (eraRewardPoints, validatorId) {
        // Ideally we would just use the map's `get`, but that does not seem to be working here
        for (var _i = 0, _a = eraRewardPoints.individual.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], id = _b[0], points = _b[1];
            if (id.toString() === validatorId) {
                return points;
            }
        }
        return;
    };
    /**
     * Extract the exposure of `address` and `totalExposure`
     * from polkadot-js's `deriveEraExposure`.
     *
     * @param address address of the _Stash_  account to get the exposure of behind `validatorId`
     * @param validatorId accountId of a validator's _Stash_  account
     * @param deriveEraExposure
     */
    AccountsStakingPayoutsService.prototype.extractExposure = function (address, validatorId, deriveEraExposure) {
        var _a;
        // Get total stake behind validator
        var totalExposure = deriveEraExposure.validators[validatorId].total;
        // Get nominators stake behind validator
        var exposureAllNominators = deriveEraExposure.validators[validatorId].others;
        var nominatorExposure = address === validatorId // validator is also the nominator we are getting payouts for
            ? deriveEraExposure.validators[address].own
            : (_a = exposureAllNominators.find(function (exposure) { return exposure.who.toString() === address; })) === null || _a === void 0 ? void 0 : _a.value;
        return {
            totalExposure: totalExposure,
            nominatorExposure: nominatorExposure
        };
    };
    /**
     * Derive the list of validators nominated by `address`. Note: we count validators as nominating
     * themself.
     *
     * @param address address of the _Stash_  account to get the payouts of
     * @param deriveEraExposure result of query api.derive.staking.eraExposure(eraIndex)
     */
    AccountsStakingPayoutsService.prototype.deriveNominatedExposures = function (address, deriveEraExposure) {
        var _a;
        var nominatedExposures = (_a = deriveEraExposure.nominators[address]) !== null && _a !== void 0 ? _a : [];
        if (deriveEraExposure.validators[address]) {
            // We treat an `address` that is a validator as nominating itself
            nominatedExposures = nominatedExposures.concat({
                validatorId: address,
                // We put in an arbitrary number because we do not use the index
                validatorIndex: 9999
            });
        }
        return nominatedExposures;
    };
    return AccountsStakingPayoutsService;
}(AbstractService_1.AbstractService));
exports.AccountsStakingPayoutsService = AccountsStakingPayoutsService;
