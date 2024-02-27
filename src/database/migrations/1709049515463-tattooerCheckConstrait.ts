import { MigrationInterface, QueryRunner } from "typeorm";

export class TattooerCheckConstrait1709049515463 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TRIGGER CHK_tattooer_role
            BEFORE INSERT ON appointments
            FOR EACH ROW
            BEGIN
                DECLARE user_role VARCHAR(255);
                SELECT roles.name INTO user_role
                FROM users
                JOIN roles ON users.role_id = roles.id
                WHERE users.id = NEW.tattooer_id;
            
                IF user_role != 'tattooer' THEN
                    SIGNAL SQLSTATE '45000' 
                    SET MESSAGE_TEXT = 'The tattooer_id must refer to a user with the role ''tattooer''';
                END IF;
            END`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP TRIGGER "check_tattooer_role"`);
    }

}
