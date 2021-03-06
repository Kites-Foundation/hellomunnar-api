import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class alterReview1613807846847 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'reviews',
      new TableColumn({
        name: 'typeId',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('reviews', 'typeId');
  }
}
