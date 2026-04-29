import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Payment {
  id: number;
  reference: string;
  breederName: string;
  amount: number;
  date: string;
  method: 'Orange Money' | 'Wave' | 'Virement' | 'Espèces';
  status: 'Validé' | 'En attente' | 'Rejeté';
}

@Component({
  selector: 'app-paiements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paiements.component.html',
  styleUrls: ['./paiements.component.scss']
})
export class PaiementsComponent {
  searchTerm = signal('');
  statusFilter = signal('all');
  isModalOpen = signal(false);

  // Données de démonstration
  payments = signal<Payment[]>([
    { id: 1, reference: 'PAY-25001', breederName: 'Moussa Sarr', amount: 500000, date: '2025-01-20', method: 'Orange Money', status: 'Validé' },
    { id: 2, reference: 'PAY-25002', breederName: 'Fatou Diagne', amount: 1200000, date: '2025-01-21', method: 'Virement', status: 'En attente' },
    { id: 3, reference: 'PAY-25003', breederName: 'Oumar Sow', amount: 75000, date: '2025-01-22', method: 'Wave', status: 'Validé' },
  ]);

  newPayment: Partial<Payment> = this.resetFormValue();

  filteredPayments = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const status = this.statusFilter();
    
    return this.payments().filter(p => {
      const matchesSearch = p.breederName.toLowerCase().includes(term) || p.reference.toLowerCase().includes(term);
      const matchesStatus = status === 'all' || p.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  totalValidated = computed(() => 
    this.payments()
      .filter(p => p.status === 'Validé')
      .reduce((acc, curr) => acc + curr.amount, 0)
  );

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.newPayment = this.resetFormValue();
  }

  private resetFormValue() {
    return { breederName: '', amount: 0, method: 'Wave' as const, status: 'En attente' as const };
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const { id: _, ...data } = this.newPayment;
    const payment: Payment = {
      ...data as Payment,
      id: Date.now(),
      reference: `PAY-${Math.floor(Math.random() * 90000) + 10000}`,
      date: new Date().toISOString().split('T')[0]
    };
    this.payments.update(prev => [payment, ...prev]);
    this.closeModal();
  }

  updateStatus(id: number, newStatus: 'Validé' | 'Rejeté') {
    this.payments.update(list => 
      list.map(p => p.id === id ? { ...p, status: newStatus } : p)
    );
  }

  deletePayment(id: number) {
    if (confirm('Supprimer cet historique de paiement ?')) {
      this.payments.update(list => list.filter(p => p.id !== id));
    }
  }
}