cd prisma
bunx prisma migrate diff --from-schema-datamodel ./schema3.prisma --to-schema-datamodel ./schema4.prisma --script > ./baseline.sql