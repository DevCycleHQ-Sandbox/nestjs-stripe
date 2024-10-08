"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StripeCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeCoreModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const providers_1 = require("./providers");
const util_1 = require("./util");
let StripeCoreModule = StripeCoreModule_1 = class StripeCoreModule {
    static forRoot(options) {
        const provider = (0, providers_1.createStripeProvider)(options);
        return {
            exports: [provider],
            module: StripeCoreModule_1,
            providers: [provider],
        };
    }
    static forRootAsync(options) {
        const stripeProvider = {
            inject: [(0, constants_1.getModuleOptionsToken)(options.name)],
            provide: options.name ?? constants_1.stripeToken,
            useFactory: (stripeOptions) => (0, util_1.getStripeClient)(stripeOptions),
        };
        return {
            exports: [stripeProvider],
            imports: options.imports,
            module: StripeCoreModule_1,
            providers: [...this.createAsyncProviders(options), stripeProvider],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                inject: options.inject || [],
                provide: (0, constants_1.getModuleOptionsToken)(options.name),
                useFactory: options.useFactory,
            };
        }
        return {
            inject: [options.useExisting || options.useClass],
            provide: (0, constants_1.getModuleOptionsToken)(options.name),
            useFactory: (optionsFactory) => optionsFactory.createStripeOptions(),
        };
    }
};
exports.StripeCoreModule = StripeCoreModule;
exports.StripeCoreModule = StripeCoreModule = StripeCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], StripeCoreModule);
//# sourceMappingURL=StripeCoreModule.js.map