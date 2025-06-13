import { KeywordNotification } from '@domain/board/entity/keyword-notification.entity';

export interface KeywordNotificationRepository {
  findByAuthorName(authorName: string): Promise<KeywordNotification[]>;
  /**
   * [주의] 이 메서드는 소규모/PoC에서만 사용 가능하며,
   * 대규모 서비스에서는 반드시 역색인 기반 검색엔진(예: ElasticSearch) 도입이 필요합니다.
   */
  findAll(): Promise<KeywordNotification[]>;
}
