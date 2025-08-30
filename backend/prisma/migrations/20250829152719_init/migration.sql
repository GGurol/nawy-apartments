-- AlterTable
-- First, add new columns with default values
ALTER TABLE "Apartment" ADD COLUMN "project" TEXT DEFAULT 'Mivida';
ALTER TABLE "Apartment" ADD COLUMN "unitName" TEXT DEFAULT 'Apartment';
ALTER TABLE "Apartment" ADD COLUMN "unitNumber" TEXT DEFAULT 'A-001';

-- Update existing records with meaningful values
UPDATE "Apartment" SET 
  "project" = 'Mivida',
  "unitName" = CASE 
    WHEN "title" = 'Sunny 2BR in Zamalek' THEN 'Sunny 2BR'
    WHEN "title" = 'Modern Studio in New Cairo' THEN 'Modern Studio'
    WHEN "title" = 'Family 3BR in Sheikh Zayed' THEN 'Family 3BR'
    ELSE 'Apartment'
  END,
  "unitNumber" = CASE 
    WHEN "title" = 'Sunny 2BR in Zamalek' THEN 'Z-201'
    WHEN "title" = 'Modern Studio in New Cairo' THEN 'NC-101'
    WHEN "title" = 'Family 3BR in Sheikh Zayed' THEN 'SZ-301'
    ELSE 'A-001'
  END;

-- Make columns NOT NULL
ALTER TABLE "Apartment" ALTER COLUMN "project" SET NOT NULL;
ALTER TABLE "Apartment" ALTER COLUMN "unitName" SET NOT NULL;
ALTER TABLE "Apartment" ALTER COLUMN "unitNumber" SET NOT NULL;

-- Drop old columns
ALTER TABLE "Apartment" DROP COLUMN "city";
ALTER TABLE "Apartment" DROP COLUMN "title";

-- Change primary key
ALTER TABLE "Apartment" DROP CONSTRAINT "Apartment_pkey";
ALTER TABLE "Apartment" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE "Apartment" ALTER COLUMN "id" SET DATA TYPE TEXT;
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Apartment_id_seq";
