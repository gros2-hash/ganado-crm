import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { StatsService, Agente, LoteStats, ProductorStats, ChatbotStats } from '../../services/stats.service';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.scss',
})
export class EstadisticasComponent implements OnInit {
  agentes: Agente[] = [];
  lotesCompra!: LoteStats;
  lotesVenta!: LoteStats;
  productores!: ProductorStats;
  chatbot!: ChatbotStats;

  get agenteTopCierres(): Agente { return this.agentes[0]; }
  get agenteTopChatbot(): Agente {
    return [...this.agentes].sort((a, b) => b.interaccionesChatbot - a.interaccionesChatbot)[0];
  }
  get maxChatInteracciones(): number {
    return Math.max(...this.agentes.map(a => a.interaccionesChatbot));
  }
  get maxCierres(): number {
    return Math.max(...this.agentes.map(a => a.comercializaciones));
  }
  get maxBarHora(): number {
    return Math.max(...this.chatbot.actividadPorHora.map(h => h.sesiones));
  }

  constructor(private stats: StatsService, private auth: AuthService) {}

  logout(): void { this.auth.logout(); }

  ngOnInit(): void {
    this.agentes     = this.stats.getAgentes();
    this.lotesCompra = this.stats.getLotesCompra();
    this.lotesVenta  = this.stats.getLotesVenta();
    this.productores = this.stats.getProductores();
    this.chatbot     = this.stats.getChatbotStats();
  }

  barWidth(value: number, max: number): string {
    return `${Math.round((value / max) * 100)}%`;
  }

  tendenciaIcon(v: number): string { return v >= 0 ? '▲' : '▼'; }
  tendenciaClass(v: number): string { return v >= 0 ? 'pos' : 'neg'; }
}
