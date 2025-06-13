import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { KeywordNotificationRepository } from '@domain/board/repository/keyword-notification.repository';
import { KeywordNotification } from '@domain/board/entity/keyword-notification.entity';

@Injectable()
export class KeywordNotificationRepositoryImpl implements KeywordNotificationRepository {
  constructor(private dataSource: DataSource) {}

  findByAuthorName(authorName: string, _entityManager?: EntityManager): Promise<KeywordNotification[]> {
    const entityManager = _entityManager ?? this.dataSource.manager;
    return entityManager.getRepository(KeywordNotification).find({ where: { authorName } });
  }

  /**
   * [주의] 이 메서드는 소규모/PoC에서만 사용 가능하며,
   * 대규모 서비스에서는 반드시 역색인 기반 검색엔진(예: ElasticSearch) 도입이 필요합니다.
   */
  findAll(_entityManager?: EntityManager): Promise<KeywordNotification[]> {
    const entityManager = _entityManager ?? this.dataSource.manager;
    return entityManager.getRepository(KeywordNotification).find();
  }
}
