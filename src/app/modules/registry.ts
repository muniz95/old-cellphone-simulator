import { FeatureModule } from '@/app/modules/feature-module';
import { calculatorModule } from '@/features/calculator/module';
import { clockModule } from '@/features/clock/module';
import { phoneBookModule } from '@/features/phone-book/module';
import { profilesModule } from '@/features/profiles/module';
import { settingsModule } from '@/features/settings/module';
import { simServicesModule } from '@/features/sim-services/module';
import { tonesModule } from '@/features/tones/module';

export const featureModules: FeatureModule[] = [
  tonesModule,
  settingsModule,
  phoneBookModule,
  calculatorModule,
  clockModule,
  profilesModule,
  simServicesModule,
];

export const featureRoutes = featureModules.flatMap((module) => module.routes);
