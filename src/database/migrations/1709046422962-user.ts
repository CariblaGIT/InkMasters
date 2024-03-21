import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class User1709046422962 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "role_id",
                        type: "int",
                        default: 1
                    },
                    {
                        name: "fullname",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "username",
                        type: "varchar",
                        length: "255",
                        isUnique: true
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isUnique: true
                    },
                    {
                        name: "password_hash",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                        onUpdate: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["role_id"],
                        referencedTableName: "roles",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}

