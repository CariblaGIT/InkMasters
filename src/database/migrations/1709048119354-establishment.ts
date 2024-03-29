import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Establishment1709048119354 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "establishments",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "address",
                        type: "varchar",
                        length: "255",
                        isUnique: true
                    },
                    {
                        name: "city",
                        type: "varchar",
                        isNullable: true,
                        length: "255"
                    },
                    {
                        name: "postal_code",
                        type: "int",
                        isNullable: true,
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("establishments");
    }

}


